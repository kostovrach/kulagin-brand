<template>
    <article class="article__content">
        <aside class="article__sider" v-if="chapters.length">
            <nav class="article__nav" aria-label="Оглавление">
                <p class="article__nav-title">Содержание</p>
                <a
                    v-for="(ch, index) in chapters"
                    :key="index"
                    class="article__nav-link"
                    :href="`#target-${index}`"
                    :class="{ active: activeId === `target-${index}` }"
                    @click.prevent="scrollTo(index)"
                >
                    {{ ch.title }}
                </a>
            </nav>
        </aside>
        <div class="article__main">
            <template v-for="(block, index) in blocks" :key="index">
                <!-- Параграф -->
                <p
                    class="article__paragraph article__paragraph--summary"
                    v-if="block.type === 'paragraph' && block.text"
                >
                    {{ block.text }}
                </p>

                <!-- Изображение -->
                <picture class="article__image-container" v-else-if="block.type === 'image' && block.src">
                    <img :src="block.src" :alt="block.alt || ''" />
                </picture>

                <!-- Глава -->
                <section
                    class="article__chapter"
                    v-else-if="block.type === 'chapter'"
                    :id="`target-${chapterIndex(block)}`"
                    :aria-label="block.title || null"
                >
                    <h2 class="article__title" v-if="block.title">{{ block.title }}</h2>

                    <picture class="article__image-container" v-if="block.image">
                        <img :src="block.image" :alt="block.title || ''" />
                    </picture>

                    <!-- Вложенные блоки главы -->
                    <template v-for="(sub, si) in block.blocks || []" :key="si">
                        <p class="article__paragraph" v-if="sub.type === 'paragraph' && sub.text">
                            {{ sub.text }}
                        </p>

                        <picture class="article__image-container" v-else-if="sub.type === 'image' && sub.src">
                            <img :src="sub.src" :alt="sub.alt || ''" />
                        </picture>

                        <ul class="article__list" v-else-if="sub.type === 'list' && sub.items && sub.items.length">
                            <li v-for="(it, ii) in sub.items" :key="ii">{{ it }}</li>
                        </ul>

                        <dl
                            class="article__values-list"
                            v-else-if="sub.type === 'values-list' && sub.items && sub.items.length"
                        >
                            <template v-for="(it, ii) in sub.items" :key="ii">
                                <dt class="article__value">{{ it.value }}</dt>
                                <dd class="article__value-desc">- {{ it.description }}</dd>
                            </template>
                        </dl>

                        <video
                            class="article__video"
                            v-else-if="sub.type === 'video' && sub.src"
                            controls
                            preload="metadata"
                        >
                            <source :src="sub.src" />
                            Ваш браузер не поддерживает видео.
                        </video>

                        <table class="article__table" v-else-if="sub.type === 'table' && sub.rows && sub.rows.length">
                            <thead v-if="sub.headers && sub.headers.length">
                                <tr>
                                    <th v-for="(h, hi) in sub.headers" :key="hi">{{ h }}</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(row, ri) in sub.rows" :key="ri">
                                    <td v-for="(cell, ci) in row" :key="ci">{{ cell }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </template>
                </section>

                <!-- Список -->
                <ul class="article__list" v-else-if="block.type === 'list' && block.items && block.items.length">
                    <li v-for="(it, ii) in block.items" :key="ii">{{ it }}</li>
                </ul>

                <!-- Таблица показателей -->
                <dl
                    class="article__values-list"
                    v-else-if="block.type === 'values-list' && block.items && block.items.length"
                >
                    <template v-for="(it, ii) in block.items" :key="ii">
                        <dt class="article__value">{{ it.value }}</dt>
                        <dd class="article__value-desc">{{ it.description }}</dd>
                    </template>
                </dl>

                <!-- Видео -->
                <video
                    class="article__video"
                    v-else-if="block.type === 'video' && block.src"
                    controls
                    preload="metadata"
                >
                    <source :src="block.src" />
                    Ваш браузер не поддерживает видео.
                </video>

                <!-- Таблица -->
                <table class="article__table" v-else-if="block.type === 'table' && block.rows && block.rows.length">
                    <thead v-if="block.headers && block.headers.length">
                        <tr>
                            <th v-for="(h, hi) in block.headers" :key="hi">{{ h }}</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(row, ri) in block.rows" :key="ri">
                            <td v-for="(cell, ci) in row" :key="ci">{{ cell }}</td>
                        </tr>
                    </tbody>
                </table>

                <!-- JSON для диагностики если тип неизвестен -->
                <pre v-else class="article__unknown-block">{{ JSON.stringify(block, null, 2) }}</pre>
            </template>
        </div>
    </article>
</template>

<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
    blocks: {
        type: Array,
        default: () => [],
    },
});

const chapters = computed(() => props.blocks.filter((b) => b.type === 'chapter'));

const activeId = ref(null);
let observer = null;

function chapterIndex(block) {
    return chapters.value.indexOf(block);
}

function scrollTo(index) {
    const el = document.getElementById(`target-${index}`);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

onMounted(() => {
    const options = {
        root: null,
        threshold: 0.1,
    };

    observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                activeId.value = entry.target.id;
            }
        });
    }, options);

    chapters.value.forEach((_, index) => {
        const el = document.getElementById(`target-${index}`);
        if (el) observer.observe(el);
    });
});

onBeforeUnmount(() => {
    if (observer) observer.disconnect();
});
</script>

<style lang="scss" scoped>
@use '@/assets/abstracts' as *;

.article {
    &__content {
        display: grid;
        grid-template-columns: 30% auto;
        gap: rem(64);
        padding: rem(96) 0;
        @media (max-width: 768px) {
            display: flex;
            flex-direction: column;
        }
    }
    &__sider {
        height: 100%;
        position: relative;
    }
    &__nav {
        position: sticky;
        top: $py;
        display: flex;
        flex-direction: column;
        gap: rem(16);
        border: rem(1) solid $c-111111;
        padding: rem(32);
        &-title {
            text-transform: uppercase;
            font-size: rem(24);
            font-weight: $fw-bold;
            margin-bottom: rem(16);
        }
        &-link {
            width: fit-content;
            font-family: 'Inter', sans-serif;
            font-size: rem(18);
            @include gradient-text-hover;
            &.active {
                background-position: -160% -200%;
            }
        }
    }
    &__main {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: rem(96);
        font-family: 'Inter', sans-serif;
        font-size: rem(16);
        color: $c-323232;
        line-height: 1.5;
    }
    &__paragraph {
        &--summary {
            opacity: 0.5;
        }
    }
    &__image-container,
    &__video {
        width: 100%;
        height: rem(480);
        margin-top: rem(32);
    }
    &__image-container {
        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    &__chapter {
        scroll-margin: $py;
        display: flex;
        flex-direction: column;
        gap: rem(16);
    }
    &__title {
        font-family: 'Fira', sans-serif;
        text-transform: uppercase;
        font-size: lineScale(32, 24, 480, 1440);
        font-weight: $fw-bold;
        margin-bottom: rem(16);
    }
    &__list {
        li {
            list-style: disc inside;
        }
    }
    &__values-list {
        width: fit-content;
        display: grid;
        grid-template-columns: repeat(2, auto);
        align-items: flex-end;
        gap: rem(16) rem(8);
        margin-top: rem(16);
    }
    &__value {
        width: fit-content;
        font-size: rem(40);
        font-weight: $fw-semi;
        line-height: 1;
    }
    &__table {
        text-align-last: left;
        border-spacing: 0;
        border-collapse: collapse;
        margin-top: rem(32);
        tr {
            th {
                font-size: rem(18);
            }
            th,
            td {
                padding: rem(8) rem(24);
                border: rem(1) solid $c-111111;
            }
        }
    }
}
</style>
