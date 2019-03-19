@echo off

set "JRIO_PORT_ARGS=-DSTOP.PORT=8989 -DSTOP.KEY=st0p_J3Tty"

jre\bin\java -jar jetty\start.jar jetty.base=jrio --stop %JRIO_PORT_ARGS%
