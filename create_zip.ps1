# Create zip file for Chrome Web Store submission
$tempDir = 'C:\temp_korean_verbs_ai'
$sourceDir = 'c:\Users\kreg9\Downloads\kreggscode\windsurf\Extensions\Korean verbs Ai'
$zipPath = 'C:\Users\kreg9\Downloads\korean-verbs-ai-v2.2.zip'

# Clean up if exists
if (Test-Path $tempDir) { Remove-Item $tempDir -Recurse -Force }
if (Test-Path $zipPath) { Remove-Item $zipPath -Force }

# Create temp directory
New-Item -ItemType Directory -Path $tempDir | Out-Null

# Copy core files
Copy-Item -Path "$sourceDir\manifest.json" -Destination $tempDir
Copy-Item -Path "$sourceDir\popup.html" -Destination $tempDir
Copy-Item -Path "$sourceDir\popup.js" -Destination $tempDir
Copy-Item -Path "$sourceDir\styles.css" -Destination $tempDir
Copy-Item -Path "$sourceDir\background.js" -Destination $tempDir
Copy-Item -Path "$sourceDir\korean_verbs.json" -Destination $tempDir

# Copy icons directory
Copy-Item -Path "$sourceDir\icons" -Destination $tempDir -Recurse

# Copy docs directory
Copy-Item -Path "$sourceDir\docs" -Destination $tempDir -Recurse

# Create zip file
Add-Type -AssemblyName System.IO.Compression.FileSystem
[System.IO.Compression.ZipFile]::CreateFromDirectory($tempDir, $zipPath)

Write-Host "Zip file created successfully!"
Write-Host "Location: $zipPath"
Write-Host "File size: $((Get-Item $zipPath).Length) bytes"
Write-Host ""
Write-Host "Contents:"
Get-ChildItem -Path $tempDir -Recurse | ForEach-Object {
    $relativePath = $_.FullName.Replace($tempDir, '').TrimStart('\')
    if ($relativePath) { Write-Host "  - $relativePath" }
}

# Cleanup
Remove-Item $tempDir -Recurse -Force

Write-Host ""
Write-Host "Ready for Chrome Web Store submission!"
