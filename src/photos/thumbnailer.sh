 for img in *.jpg; do
  magick "$img" -thumbnail x100 "thumb_$img"
 done
