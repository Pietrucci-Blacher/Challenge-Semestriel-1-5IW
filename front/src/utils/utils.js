import React from 'react';
import Image from 'next/image';

/**
 * Create url parameters from filter object
 *
 * @param {object} filter - filter object
 * @returns {string} parameters string
 */
export const urlParameters = (filter) => {
    const param = Object.keys(filter)
        .filter((key) => !['minPrice', 'maxPrice'].includes(key) && filter[key])
        .map((key) => `${key}=${filter[key]}`);

    if (filter.minPrice) param.push(`price[gt]=${filter.minPrice}`);
    if (filter.maxPrice) param.push(`price[lt]=${filter.maxPrice}`);

    const allParams = param.join('&');
    return allParams ? `?${allParams}` : '';
};

/**
 * convert EditorJS data to React HTML
 *
 * @param {object} blocks - EditorJS data
 * @returns {JSX.Element} React HTML
 */
export const convertDataToHtml = (blocks) => {
    const convertedHtml = blocks.map((block, key) => {
        if (block.type === 'header') {
            return React.createElement(
                `h${block.data.level}`,
                null,
                block.data.text,
            );
        } else if (block.type === 'paragraph') {
            return <p key={key}>{block.data.text}</p>;
        } else if (block.type === 'delimiter') {
            return <hr key={key} />;
        } else if (block.type === 'image') {
            return (
                <Image
                    key={key}
                    src={block.data.file.url}
                    alt={block.data.caption}
                />
            );
        } else if (block.type === 'list') {
            const style =
                block.data.style === 'ordered' ? 'list-decimal' : 'list-disc';
            const listItems = block.data.items.map((item, i) => (
                <li key={i} className={style}>
                    {item}
                </li>
            ));
            return <ul key={key}>{listItems}</ul>;
        }
    });

    return <>{convertedHtml}</>;
};
