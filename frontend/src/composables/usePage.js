import { useDirectusResource } from '@/composables/useDirectusResource';

function expandSections(sections, extraFields = ['*']) {
    const fields = [...extraFields];

    sections.forEach((section) => {
        if (typeof section === 'string') {
            fields.push(`${section}.*`);
        } else if (typeof section === 'object' && section.section) {
            fields.push(`${section.section}.*`);
            if (section.with) {
                section.with.forEach((sub) => {
                    fields.push(`${section.section}.${sub}.*`);
                });
            }
        }
    });

    return fields;
}

export function usePage(slug, sections = [], extraFields = ['*']) {
    const fields = expandSections(sections, extraFields);

    return useDirectusResource(
        'pages',
        {
            filter: { slug: { _eq: slug } },
            fields,
            limit: 1,
        },
        null,
        {
            immediate: true,
            resolveFiles: { enabled: true, fetchMeta: false },
        },
    );
}
