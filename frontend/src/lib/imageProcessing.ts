import { heicTo } from 'heic-to';
import imageCompression from 'browser-image-compression';

// Проверка на HEIC
const HEIC_REGEX = /\.(heic|heif)$/i;

export function isHeicFile(file: File) {
    const fileName = file.name.toLowerCase();
    return file.type === 'image/heic' || file.type === 'image/heif' || HEIC_REGEX.test(fileName);
}

// Конвертация
export async function convertHeicToJpeg(file: File, quality = 0.9) {
    const jpegBlob = await heicTo({
        blob: file,
        type: 'image/jpeg',
        quality,
    });
    return new File([jpegBlob], file.name.replace(HEIC_REGEX, '.jpg'), { type: 'image/jpeg' });
}

// Общая функция подготовки (используем при загрузке)
export async function prepareImageForUpload(file: File) {
    let workingFile = file;

    if (isHeicFile(file)) {
        workingFile = await convertHeicToJpeg(file);
    }

    // Дальше сжимаем через browser-image-compression...
    const compressed = await imageCompression(workingFile, {
        maxSizeMB: 2,
        maxWidthOrHeight: 1920,
        useWebWorker: true,
    });

    // Normalize extension to .jpg
    const finalName = compressed.name.replace(/\.[^/.]+$/, '') + '.jpg';
    return new File([compressed], finalName, { type: compressed.type });
}
