# Dragino GPS Trackers

## Status LED

| Event               | Action                              | AT+LON\* | AT+MLON\* |
| ------------------- | ----------------------------------- | -------- | --------- |
| Power On            | BLUE, RED, Green flash once         | N/A      | N/A       |
| Join request        | BLUE led fast blink once (200ms)    | Yes      | N/A       |
| Join Success        | Purple led on 1 second              | N/A      | N/A       |
| Fixing Location     | GREEN blinks 200ms per second       | Yes      | N/A       |
| Fixed and uplink    | BLUE blinks twice (200ms per blink) | Yes      | N/A       |
| Fail Fix and uplink | RED blinks twice (200ms per blink)  | Yes      | N/A       |
| Enter Alarm mode    | RED on five seconds                 | N/A      | N/A       |
| Uplink under Alarm  | RED on one second                   | Yes      | N/A       |
| Exit Alarm          | BLUE on one second                  | Yes      | N/A       |
| Downlink Modify TDC | GREEN led on 1 second               | Yes      | N/A       |
| Movement Detect     | Red on 500ms                        | N/A      | Yes       |

\* to control on/off

## AT+Commands and Downlinks

| Command Name                                   | AT Command   | Default | Unit                | Downlink Prefix | Downlink Example                 | Note                       |
| ---------------------------------------------- | ------------ | ------- | ------------------- | --------------- | -------------------------------- | -------------------------- |
| Set Transmit Interval                          | AT+TDC=N     | 30000   | N = milliseconds    | 0x01            |                                  |                            |
| Set alarm packet transmit interval             | AT+ACE=N     | 60000   | N = milliseconds    | 0xB1            | 60s = `00003C`                   | downlink sends hex seconds |
| Exit Alarm                                     | -            | 01      |                     | 0x02            |                                  |                            |
| Set keep alive time data transmission interval | AT+KAT=N     | 600000  | N = milliseconds    | 0xA9            | 600s = `000258`                  | downlink sends hex seconds |
| Movement Detect Mode                           | AT+MD=N      | 0       | N = $MovementDetect | 0xA5            | Move = `01`, Custom = `03 19 04` |                            |
| Set MAX GPS position time                      | AT+FTIME=N   | 150     | N = seconds         | 0xAA            | 150s = `00 96`                   |                            |
| Set GPS navigation mode                        | AT+NMEA886=N | 0       | N = $GPSNavigation  | 0xAB            | Fitness = `02`                   |

`$MovementDetect` = `(0:Disable, 1:Move, 2:Collide, 3:Customized)`

`$GPSNavigation` = `(0:Default, 1:Normal, 2:Fitness, 3:Aviation, 4:Balloon, 5:Stationary)`
