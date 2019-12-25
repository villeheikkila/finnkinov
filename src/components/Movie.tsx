import React from 'react';

interface MovieProps {
    title: string,
    url: string,
}

export const Movie = ({title, url}: MovieProps) => {
  return (
    <div>
        <a href={url}>{title}</a>
    </div>
  );
}
