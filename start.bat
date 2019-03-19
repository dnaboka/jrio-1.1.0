@echo off

set "JRIO_MEMORY_ARGS=-Xms256m -Xmx512m"
set "JRIO_SECURITY_ARGS="
rem set "JRIO_SECURITY_ARGS=-Djava.security.manager -Djava.security.policy=jrio\security.policy"
set "JRIO_PORT_ARGS=-Djetty.http.port=8080 -DSTOP.PORT=8989 -DSTOP.KEY=st0p_J3Tty"

jre\bin\java %JRIO_MEMORY_ARGS% %JRIO_SECURITY_ARGS% -jar jetty\start.jar jetty.base=jrio --start %JRIO_PORT_ARGS% -Djava.util.logging.manager=org.apache.logging.log4j.jul.LogManager
