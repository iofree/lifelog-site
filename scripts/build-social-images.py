"""Build 1200x630 social cards from the site's published App Store screenshots.

Requires Pillow and the macOS Hiragino Sans GB / Avenir Next fonts. Font files
are used locally to render pixels, not embedded or redistributed. Screenshot
provenance is recorded in assets/app-store/source.json. No app UI is invented.
"""

from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter, ImageCms

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/assets/social'
SRGB = ImageCms.ImageCmsProfile(ImageCms.createProfile('sRGB')).tobytes()
INK, GREEN, MUTED, PAPER = '#153D32', '#008862', '#576C63', '#F5F6F0'


def font(size, locale, bold=False):
    path = '/System/Library/Fonts/Hiragino Sans GB.ttc' if locale == 'zh-CN' else '/System/Library/Fonts/Avenir Next.ttc'
    return ImageFont.truetype(path, size, index=(2 if bold else 0) if locale == 'zh-CN' else (0 if bold else 7))


def text(im, xy, value, size, locale, fill=INK, bold=False, max_width=620):
    draw = ImageDraw.Draw(im)
    face = font(size, locale, bold)
    box = draw.textbbox((0, 0), value, font=face)
    assert box[2] - box[0] <= max_width, value
    draw.text((xy[0], xy[1] - box[1]), value, font=face, fill=fill)


def screenshot(im, locale, name, crop, x, y, width):
    source = Image.open(ROOT / 'assets/app-store' / locale / name).convert('RGB')
    ui = source.crop(tuple(round(v * 2 / 3) for v in crop))
    ui = ui.resize((width, round(width * ui.height / ui.width)), Image.Resampling.LANCZOS)
    mask = Image.new('L', ui.size)
    ImageDraw.Draw(mask).rounded_rectangle((0, 0, ui.width - 1, ui.height - 1), radius=16, fill=255)
    shadow = Image.new('RGBA', im.size)
    ImageDraw.Draw(shadow).rounded_rectangle((x, y + 7, x + ui.width, y + ui.height + 7), radius=16, fill=(20, 50, 40, 45))
    im.alpha_composite(shadow.filter(ImageFilter.GaussianBlur(14)))
    im.paste(ui, (x, y), mask)


def build(locale):
    im = Image.new('RGBA', (1200, 630), PAPER)
    draw = ImageDraw.Draw(im)
    draw.ellipse((720, -230, 1460, 720), fill='#E2EDE2')
    icon = Image.open(ROOT / 'public/assets/logo.png').convert('RGBA').resize((62, 62), Image.Resampling.LANCZOS)
    im.alpha_composite(icon, (62, 52))
    zh = locale == 'zh-CN'
    text(im, (140, 66), '人生笔记Real' if zh else 'Lifelog Note', 32, locale, bold=True)
    text(im, (64, 184), '照片日记 · 日记串' if zh else 'PHOTO JOURNAL · DIARY THREADS', 20 if zh else 17, locale, GREEN, True)
    lines = ['用照片记日常', '把一件事接着记'] if zh else ['Your days in photos.', 'Your stories, together.']
    for i, line in enumerate(lines):
        text(im, (60, 239 + i * 76), line, 52 if zh else 48, locale, bold=True, max_width=645)
    text(im, (64, 426), '一张照片，一句话，留住今天。' if zh else 'A photo. A few words. A memory to keep.', 24 if zh else 23, locale, MUTED)
    text(im, (64, 550), 'lifelog.iofree.xyz', 22, 'en-US', MUTED)
    if zh:
        screenshot(im, locale, '03.webp', (135, 865, 1190, 2815), 972, 174, 177)
        screenshot(im, locale, '01.webp', (135, 865, 1190, 2815), 722, 94, 239)
    else:
        screenshot(im, locale, '04.webp', (100, 570, 1142, 2595), 972, 174, 177)
        screenshot(im, locale, '01.webp', (100, 570, 1142, 2595), 722, 94, 239)
    OUT.mkdir(parents=True, exist_ok=True)
    im.convert('RGB').save(OUT / (locale + '.png'), optimize=True, icc_profile=SRGB)


if __name__ == '__main__':
    for locale in ['zh-CN', 'en-US']:
        build(locale)
