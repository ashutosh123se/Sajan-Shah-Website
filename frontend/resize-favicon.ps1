Add-Type -AssemblyName System.Drawing

$srcPath = "d:\Sajan-Shah-Website-main\frontend\public\loding.png"
$src = [System.Drawing.Image]::FromFile($srcPath)

# Create 192x192 version for maximum clarity
$size = 192
$bmp = New-Object System.Drawing.Bitmap($size, $size)
$g = [System.Drawing.Graphics]::FromImage($bmp)
$g.InterpolationMode = [System.Drawing.Drawing2D.InterpolationMode]::HighQualityBicubic
$g.SmoothingMode = [System.Drawing.Drawing2D.SmoothingMode]::HighQuality
$g.PixelOffsetMode = [System.Drawing.Drawing2D.PixelOffsetMode]::HighQuality
$g.CompositingQuality = [System.Drawing.Drawing2D.CompositingQuality]::HighQuality
$g.Clear([System.Drawing.Color]::Transparent)
$g.DrawImage($src, 0, 0, $size, $size)
$bmp.Save("d:\Sajan-Shah-Website-main\frontend\public\favicon-192.png", [System.Drawing.Imaging.ImageFormat]::Png)
$g.Dispose()
$bmp.Dispose()

Write-Host "Done - favicon-192.png created"

$src.Dispose()
