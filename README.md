## Специфика архитектуры

- front: Vue 3 Composition API + Pinia + Vue Router
- back: Directus + PostgreSQL в одном docker-контейнере (оф образы)


## Backend

В directus через UI клиент создаются все коллекции, настраиваются роли и права доступа. Для фронтенда сейчас существует отдельная роль с ассоциированным токеном, который дает право только на чтение.

```
backend/
   backups/
    schema.yaml             # backup схемы данных directus
    backup.sql              # польный backup postgres, включая все загруженные данные, таблицы пользователей и data-modal всех коллекций
   uploads/                 # файлы загруженные с cms
   docker-compose.yml       # основная конфигурация directus и postgres
   Dockerfile               # доп. сервисы для directus
```

Для восстановления данных при миграции или проблем на сервере есть два варианта:
- восстановление из `schema.js`. Этот вариант восстановит все коллекции в directus, но все связи, поля, роли придется восстанавливать руками (может пригодится при миграции, чтобы не тянуть все файлы за собой, но вариант все же сомнительный)
- восстановление из `backup.sql`. В этом случае восстановится полная конфигурация таблиц postgres, т.е. все роли, права, коллекции, поля и связи, иначе говоря воссоздание полной копии базы на момент бэкапа

## Frontend

Фронтенд получает данные по REST запросу через `@directus/sdk` указывая в заголовках запроса ранее упомянутый токен (файл `services/directus.js`). Дальше запрос в `composbales/usePage.js`, который при вызове из компонента Vue запрашивает конкретную коллекцию directus

```
frontend/
   .env                                 # адрес api и static-token указывается в одной переменной
   src/
     composables/
       useDirectusItem.js               # хук для обработки запросов, успользует utils/cache.js
       usePage.js                       # слой обработки данных, при вызове обращается к services/directus.js с запросом конкретной коллекции
     repositories/
       pageRepository.js                # оболочка directusData: требуется для декларации полей и фильтров
       blogRepository.js                # оболочка directusData: требуется для декларации полей и фильтров
     services/
       directus.js                      # самый низкоуровневый клиент + утилиты для assets
       directusData.js                  # единый data-driver: используется как единый источник данных, нормализует запросы и тд.
     stores/
       blog.js                          # "фасад" блога, делает запрос к directusData и обрабатывает стейты (загрузка/ошибка)
       seo.js                           # запрос только к directus-коллекции seo_settings (также через directusData)
     utils/
       cache.js                         # утилита для кеширования
     views/
       about/
         AboutView.vue                  # страница 
         layout/
           AboutBrand.vue               # layout-компонент страницы
           AboutHero.vue                # layout-компонент страницы
           AboutProjects.vue            # layout-компонент страницы
       home/
         HomeView.vue                   # цельная страница без layout-комопнентов (иногда встречается)
```

### Data layer

#### services/directus.js

Используется только для инициализации `@directus/sdk` и предоставляет базовые утилиты для работы с ассетами, например:

- `assetUrl()` — формирует прямой URL для файла; (поскольку при обращении к файлу в лоб возвращается только его id)
- `fetchFileMeta()` — чтение метаданных файла;
- `fetchFilesMetaBulk()` — bulk запрос метаданных.

#### services/directusData.js

Единая точка обращения к api, имеет:

- Нормализаторы `normalizeSingleResponse()` и `normalizeListResponse()` для приведения ответа SDK к одной записи или к массиву записей соответственно;
- keyBuilders составления запросов к directus
- fetch API: `fetchItem()` и `fetchList()`, например:

```javascript
// получить одну страницу:
const page = await fetchItem('about', { fields: ['*','about_hero.*','about_hero.hint.*'] });

// получить список статей:
const list = await fetchList('article', { fields: ['id','title','slug'] }, { persist: true });
```

#### utils/cache.js

Лёгкий memory cache, который используется в `useDirectusItem.directusData` использует собственный memory/persist кеш чтобы хуки могли иметь свой локальный кеш

#### composables/usePage.js

Внутри комопнента страницы (все, что с view постфиксом) делается запрос к `composbales/usePage.js`, если у нужной коллекции есть сови зависимые коллекции (`withRelations`), то при запросе их тоже нужно указать, например, у коллекции about_hero есть вложенная коллекция hint: `['sections.item.hint.*'`:

```vue
import { usePage } from '@/composables/usePage';

const { page, loading, error } = usePage('about', ['sections.item.hint.*'], { resolveFiles: true });
```

Возвращается объект page и стейты загрузки/ошибки. Дальше page прокидывается как пропс в layout-компоненты страницы со своим объектом под-коллекции страницы:

```vue
<AboutHero :content="page?.about_hero" />
```

Внутри layout-комопнента пропс content уже является полноценным раскрытым объектом и к нему можно обращаться по нужным ключам, включая вложенные объекты:

```vue
<div class="hero__head">
    <div class="hero__titlebox">
        <h1 class="hero__title fade-bottom-rotate">{{ content?.title }}</h1>
        <p class="hero__subtitle fade-bottom-rotate" style="animation-delay: 0.2s">{{ content?.subtitle }}</p>
    </div>
    <picture class="hero__image-container fade-scale" style="animation-delay: 0.3s">
        <img class="hero__image" :src="content?.image_url" alt="#" />
    </picture>
</div>

<!-- ... -->

<SectionHint
    class="hero__hint"
    :video="content?.hint?.video_url"
    :modal-media="content?.hint?.video_url"
>
    <template #title>{{ content?.hint?.title }}</template>
    <template #text>{{ content?.hint?.description }}</template>
    <template #media-description>{{ content?.hint?.button_text }}</template>
</SectionHint>
```

#### stores/blog.js

"Фасад" для блога и отдельных статей

Имеет собственные стейты:

- `list (ref[])`: список статей
- `articles (reactive object)`: мапа slug => article
- `isLoadingList`: boolean
- `loadingArticles`: reactive map slug => boolean
- `errors`: `{ list, articles }`

Методы:

- `fetchList()`: вызывает `getArticlesList()` и обновляет `list`
- `fetchArticle()`: вызывает `getArticleBySlug()`

### Data flow

- Компонент/View вызывает действие из стора (`blog.fetchList()` / `blog.fetchArticle(slug)`), либо использует `usePage()` напрямую =>
- => Store / composable вызывает соответствующий метод репозитория (`getArticlesList`, `getArticleBySlug`, `getPage`) =>
- => Репозиторий вызывает `directusData.fetchList/fetchItem` с нужными fields/filters =>
- => `directusData` читает читает persist cache, затем memory cache, если нет кеша делает запрос через `directus.request(readItems(...))`, нормализует ответ, добавляет _url для файлов, сохраняет результат в memory/persist cache при необходимости, возвращает данные =>
- => Store / composable получает данные, обновляет стейты => 
- => компонент рендерит данные

## Локальное развёртывание

1. Из `backend/` поднять docker-контейнер (подразумевается, что docker установлен и на компьютере включена виртуализация):

```bash
docker-compose up -d
```

2. Восстановить бд из бэкапа (в package файле есть скрипты для бэкапа и восстановления):

```bash
pnpm db:restore
```

2. После запуска по умолчанию Directus Admin будет доступен на http://localhost:8055, чтобы зайти под админом:

- Почта: `admin@example.com`
- Пароль: `SuperAdmin123!`

На проде можно поставить 2FA

3. После этого запустить из `frontend/` dev сервер vite*

*по умолчанию в directus CORS настроен на http://localhost:5173, если dev сервер на другм порту, то нужно поменять поле `CORS_ORIGIN` в `docker-compose.yml` на нужный адрес