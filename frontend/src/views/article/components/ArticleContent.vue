<template>
    <div class="article__content">
        <aside class="article__sider" v-if="chapters.length">
            <nav class="article__nav" aria-label="Оглавление">
                <p class="article__nav-title">Содержание</p>
                <a
                    v-for="(ch, index) in chapters"
                    :key="index"
                    class="article__nav-link"
                    :href="`#${ch.id}`"
                    :class="{ active: activeId === ch.id }"
                    @click.prevent="scrollTo(index)"
                >
                    {{ ch.title }}
                </a>
            </nav>
        </aside>
        <div class="article__wrapper">
            <p>{{ props?.summary }}</p>
            <div v-html="props?.content"></div>
        </div>
    </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue';

const props = defineProps({
    content: {
        type: String,
        default: '',
    },
    summary: {
        type: String,
        default: '',
    },
});

// generation heading
const chapters = ref([]);
const activeId = ref(null);
let observer = null;

function scrollTo(index) {
    const el = document.getElementById(`target-${index}`);
    if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

onMounted(() => {
    const wrapper = document.querySelector('.article__wrapper');
    if (!wrapper) return;

    const headers = Array.from(wrapper.querySelectorAll('h2'));
    chapters.value = headers.map((h, index) => {
        const id = `target-${index}`;
        h.id = id;
        return {
            id,
            title: h.textContent || `Раздел ${index + 1}`,
        };
    });

    const options = { root: null, threshold: 0.1 };
    observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                activeId.value = entry.target.id;
            }
        });
    }, options);

    headers.forEach((h) => observer.observe(h));
});

onBeforeUnmount(() => {
    if (observer) observer.disconnect();
});
</script>

<style lang="scss">
@use '@/assets/abstracts' as *;

.article {
    &__content {
        width: 100%;
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
            font-size: lineScale(24, 20, 480, 1440);
            font-weight: $fw-bold;
            margin-bottom: rem(16);
        }
        &-link {
            width: fit-content;
            font-family: 'Inter', sans-serif;
            font-size: lineScale(18, 16, 480, 1440);
            @include gradient-text-hover;
            &.active {
                background-position: -160% -200%;
            }
        }
    }
    &__wrapper {
        width: 100%;
        > p {
            font-family: 'Inter', sans-serif;
            font-size: lineScale(20, 18, 480, 1440);
            opacity: 0.5;
        }
        > div {
            font-family: 'Inter', sans-serif;
            font-size: lineScale(16, 14, 480, 1440);
            line-height: 1.6;
            padding: lineScale(64, 40, 480, 1440) 0;
            > h2 {
                font-family: 'Fira', sans-serif;
                scroll-margin: $py;
                text-transform: uppercase;
                font-size: lineScale(32, 24, 480, 1440);
                font-weight: $fw-bold;
                line-height: 1;
                margin-bottom: rem(24);
                &:not(:first-of-type) {
                    margin-top: rem(64);
                }
            }
            > p {
                > img,
                video {
                    width: 100%;
                    height: 100%;
                    max-height: rem(480);
                    object-fit: cover;
                    margin: rem(32) 0;
                }
            }
            > ul,
            ol {
                margin: rem(16) 0;
                > li {
                    margin-left: rem(24);
                }
            }
            > ul > li {
                list-style: disc outside;
            }
            > ol > li {
                list-style: decimal outside;
            }
        }
    }
}
</style>
