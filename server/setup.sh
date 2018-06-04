lanhost="$(ifconfig | grep 'inet ' | grep 192 | awk '{print $2}')"
HOST=$lanhost
echo $HOST
