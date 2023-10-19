docker compose up -d

# move to ui directory and start the client
Set-Location ./ui/guanaco
$myargs = 'run prod'
Start-Process -PassThru npm -ArgumentList $myargs

Write-Host 'UI is running at http://localhost:4200'
Write-Host 'Press any key to shutdown server...'

# wait for input from user
$key = $Host.UI.RawUI.ReadKey('NoEcho, IncludeKeyDown')

# find our client process listening on 4200
# TODO: port number needs to be dynamic (env, parameter, etc.)
$proc = (-split (netstat -ano | findstr LISTENING | findstr :4200))
$client = $proc[$proc.length - 1]
Write-Host "Killing client process $client"
kill $client

# back to root location and compose down
Set-Location ../..
docker compose down