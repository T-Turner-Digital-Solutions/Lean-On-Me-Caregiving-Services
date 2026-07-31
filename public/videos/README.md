# Video assets

Place the two completed caregiving videos here. The website references these
exact paths — do not rename them.

| File in this folder        | Used by                              |
| -------------------------- | ------------------------------------ |
| `lean-on-me-hero.mp4`      | Homepage hero background video       |
| `lean-on-me-story.mp4`     | Homepage "Care That Feels Like Family" section |

## Requirements
- **Format:** MP4 (H.264 video, AAC audio) for broad browser support.
- **Hero video:** the site plays it muted, looping, autoplay, `playsInline`.
  Per the owner's request, the hero video is presented **silenced** and carries
  an on-screen statement overlay ("At Lean On Me Caregiving, we give you the
  services you need."). Muting is enforced in code regardless of the file.
- **Optimization:** keep each file well under ~10 MB where possible. Recommended
  ~1080p, ~24–30 fps, target bitrate ~2–4 Mbps. Compress before uploading so the
  page stays fast. The hero image below is shown until the video is ready.
- **Poster fallback:** if a video cannot load, the site automatically falls back
  to the poster image `../images/lean-on-me-hero.jpg`.

## How to upload
1. Add the `.mp4` files into this folder using the exact names above.
2. Commit and push, or upload through your Netlify deploy. Large binaries can
   also be committed with Git LFS if your host supports it.
