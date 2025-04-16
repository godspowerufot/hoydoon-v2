// utils/log.ts

const isDev = process.env.NODE_ENV === 'development';

export const log = (...args: any[]) => {
  if (isDev) {
    console.log('[LOG]:', ...args);
  }
};

export const warn = (...args: any[]) => {
  if (isDev) {
    console.warn('[WARN]:', ...args);
  }
};

export const error = (...args: any[]) => {
  console.error('[ERROR]:', ...args); // maybe always log errors
};
export const convertToCSV = (data: any[]) => {
  if (!data.length) return '';

  const headers = Object.keys(data[0].item || {});
  const csvRows = [
    ['Title', 'Description', 'Price', 'Area', 'Rent', 'Image URL'], // custom headers
    ...data.map(row =>
      [
        row?.item?.title || '',
        row?.item?.description || '',
        row?.item?.price || '',
        row?.item?.squareFeet || '',
        row?.item?.rent || '',
        row?.imageUrls?.[0]?.url || '',
      ].map(value => `"${(value || '').toString().replace(/"/g, '""')}"`).join(',')
    ),
  ];
  return csvRows.join('\n');
};
