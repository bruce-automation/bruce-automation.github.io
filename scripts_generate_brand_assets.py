from PIL import Image, ImageDraw, ImageFont
import os

ROOT = os.path.dirname(__file__)
SITE = os.path.join(ROOT)
# script is stored at repo root

# Colors
BG = (11, 18, 32)         # deep navy
ACCENT = (14, 165, 233)   # sky
WHITE = (255, 255, 255)
MUTED = (190, 199, 214)


def load_font(size, bold=False):
    # Try common macOS fonts
    candidates = []
    if bold:
        candidates += [
            "/System/Library/Fonts/SFNSDisplay.ttf",
            "/System/Library/Fonts/Supplemental/Arial Bold.ttf",
            "/System/Library/Fonts/Supplemental/Helvetica Bold.ttf",
        ]
    candidates += [
        "/System/Library/Fonts/SFNS.ttf",
        "/System/Library/Fonts/Supplemental/Arial.ttf",
        "/System/Library/Fonts/Supplemental/Helvetica.ttf",
    ]
    for p in candidates:
        if os.path.exists(p):
            try:
                return ImageFont.truetype(p, size=size)
            except Exception:
                pass
    return ImageFont.load_default()


def make_og(path):
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), BG)
    d = ImageDraw.Draw(img)

    # Accent stripe
    d.rectangle([0, 0, W, 14], fill=ACCENT)

    title_font = load_font(64, bold=True)
    sub_font = load_font(30, bold=False)
    small_font = load_font(26, bold=False)

    title = "Assistant IA —\ninstallation clé en main"
    subtitle = "Local (Mac mini) ou VPS • Workflows • Garde‑fous • Handover"
    brand = "bruce-automation.github.io"

    # Simple text layout
    x = 72
    y = 120
    d.multiline_text((x, y), title, font=title_font, fill=WHITE, spacing=10)

    y2 = y + 180
    d.text((x, y2), subtitle, font=sub_font, fill=MUTED)

    # Badge
    bx, by = x, H - 130
    bw, bh = 430, 56
    d.rounded_rectangle([bx, by, bx + bw, by + bh], radius=18, fill=(18, 30, 54), outline=(33, 52, 86), width=2)
    d.text((bx + 18, by + 14), "Réserver sur Telegram", font=small_font, fill=WHITE)

    # Brand
    d.text((x, H - 58), brand, font=small_font, fill=MUTED)

    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.save(path, format="PNG", optimize=True)


def make_favicon_png(path, size):
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)

    # Rounded square background
    pad = int(size * 0.08)
    d.rounded_rectangle([pad, pad, size - pad, size - pad], radius=int(size * 0.22), fill=BG)

    # Accent dot + A letter
    # Dot
    r = int(size * 0.08)
    d.ellipse([size - pad - 2*r, pad, size - pad, pad + 2*r], fill=ACCENT)

    # Letter
    font = load_font(int(size * 0.56), bold=True)
    text = "A"
    bbox = d.textbbox((0, 0), text, font=font)
    tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
    d.text(((size - tw) // 2, (size - th) // 2 - int(size*0.03)), text, font=font, fill=WHITE)

    os.makedirs(os.path.dirname(path), exist_ok=True)
    img.save(path, format="PNG", optimize=True)


def make_ico(path, png_path):
    base = Image.open(png_path).convert("RGBA")
    sizes = [(16, 16), (32, 32), (48, 48), (64, 64), (128, 128), (256, 256)]
    imgs = [base.resize(s, Image.LANCZOS) for s in sizes]
    os.makedirs(os.path.dirname(path), exist_ok=True)
    imgs[0].save(path, format="ICO", sizes=sizes)


if __name__ == "__main__":
    og_path = os.path.join(SITE, "assets", "img", "og.png")
    make_og(og_path)

    favicon512 = os.path.join(SITE, "assets", "favicon", "favicon-512.png")
    make_favicon_png(favicon512, 512)

    favicon180 = os.path.join(SITE, "assets", "favicon", "apple-touch-icon.png")
    make_favicon_png(favicon180, 180)

    favicon32 = os.path.join(SITE, "assets", "favicon", "favicon-32.png")
    make_favicon_png(favicon32, 32)

    favicon16 = os.path.join(SITE, "assets", "favicon", "favicon-16.png")
    make_favicon_png(favicon16, 16)

    ico_path = os.path.join(SITE, "assets", "favicon", "favicon.ico")
    make_ico(ico_path, favicon512)

    print("Generated:", og_path)
    print("Generated favicons in assets/favicon/")
