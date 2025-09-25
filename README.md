## Специфика архитектуры

- front: Vue 3 Composition API + Pinia + Vue Router
- back: Directus + PostgreSQL в одном docker-контейнере (оф образы)


## Data flow

### Backend

В directus через UI клиент создаются все коллекции, настраиваются роли и права доступа. Для фронтенда сейчас существует отдельная роль с ассоциированным токеном, который дает право только на чтение. Когда есть полностью утвержденная структура коллекций можно экпортировать ее в отдельный `schema.js` файл и хранить в корне (но зачем?)

```
backend/
   .env
   docker-compose.yml       # основная конфигурация directus и postgres
   Dockerfile               # доп. сервисы для directus
   uploads/                 # файлы загруженные с cms
```

### Frontend

Фронтенд получает данные по REST запросу через `@directus/sdk` указывая в заголовках запроса ранее упомянутый токен (файл `services/directus.js`). Дальше запрос в `composbales/usePage.js`, который при вызове из компонента Vue запрашивает конкретную коллекцию directus

```
frontend/
   .env                                 # адрес api и static-token указывается в одной переменной
   src/
     composables/
       usePage.js                       # слой обработки данных, при вызове обращается к services/directus.js с запросом конкретной коллекции
     services/
       directus.js                      # основной клиент + утилиты для assets
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

## Локальное развёртывание

1. Из `backend/` поднять docker-контейнер (подразумевается, что docker установлен и на компьютере включена виртуализация):

```bash
docker-compose up -d
```

2. После запуска по умолчанию Directus Admin будет доступен на http://localhost:8055, чтобы зайти под админом:

- Почта: `admin@example.com`
- Пароль: `SuperAdmin123!`

На проде можно поставить 2FA

3. После этого запустить из `frontend/` dev сервер vite*

*по умолчанию в directus CORS настроен на http://localhost:5173, если dev сервер на другм порту, то нужно поменять поле `CORS_ORIGIN` в `docker-compose.yml` на нужный адрес