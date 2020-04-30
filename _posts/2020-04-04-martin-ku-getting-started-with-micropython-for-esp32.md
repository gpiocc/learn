---
layout: post
title:  "Getting Started with MicroPython for ESP32"
date:   2020-04-04 00:00:01
categories: [micropython, esp]
author: Martin Ku
thumbnail: "2020-04-04-martin-ku-getting-started-with-micropython-for-esp32.png"
abstract: "With MicroPython, we can control the Wifi-capable ESP32 board with simple, elegant Python codes."
---

{% include image.html url="/learn/assets/post/2020-04-04-martin-ku-getting-started-with-micropython-for-esp32/esp32.png" description="An ESP32 microcontroller" %}

#### Introduction

ESP32 is an inexpensive microcontroller with Wifi and Bluetooth built-in. It is also Arduino compatiable, which means we can write programs for it with the Arduino IDE. While we love the powerful Arduino libraries, writing C++ codes can be messy in some situations, especially when we need to do rapid prototyping. Luckily, it is possible to use Python to write programs to control ESP32, thanks to the MicroPython support for ESP32.

MicroPython is an implementation of the Python programming language for microcontrollers. One of the most popular microcontrollers, the **BBC micro:bit**, can be programmed with MicroPython. On the other hand, Adafruit's fork of MicroPython, **CircuitPython**, can also be run on a wide variety of microcontrollers [or even a Raspberry Pi](https://gpiocc.github.io/learn/raspberrypi/micropython/2020/03/27/martin-ku-show-current-weather-on-lcd-display-with-raspberry-pi.html). 

In this tutorial, we will install MicroPython on an ESP32 microcontroller, and write a simple blink program for the on-board LED.

#### A Few Words on the Computer

We will need **Python** and the **Thonny IDE** on the computer connecting to the ESP32. While you can use Linux, macOS or Windows, it's recommended to use a Raspberry Pi computer, as the Raspbian OS comes with the drivers for many microcontrollers, and the Thonny IDE is pre-installed in Raspbian as well. If you do not use a Raspberry Pi computer, you need to [download and install the Thonny IDE](https://thonny.org/) first. If you use Windows, make sure that Python has been installed and configured properly before you move on.

#### Install esptool

First, we need to install the `esptool` program. This is a Python program that helps us flash software to ESP8266 and ESP32 microcontrollers.

In the terminal, use the `pip3` command to upgrade or install the required Python packages:
```console
pi@raspberrypi:~$ pip3 install --user --upgrade pip esptool
```
This will upgrade the `pip` package and install the `esptool`.

#### Flash the firmware

Connect the ESP32 to the computer. Make sure you use a micro-USB cable **that can transfer data**. Then, [download the MicroPython firmware for ESP32 from the MicroPython website](http://micropython.org/download).

{% include image.html url="/learn/assets/post/2020-04-04-martin-ku-getting-started-with-micropython-for-esp32/esp32-download.png" description="You may just download the latest stable build." %}

When the download is completed, launch the Thonny IDE. 

{% include image.html url="/learn/assets/post/2020-04-04-martin-ku-getting-started-with-micropython-for-esp32/thonny-ide.png" description="The Thonny IDE" %}

> **_NOTE:_**  Make sure the Thonny IDE is in 'regular' mode, NOT the 'simple' mode. 

In the menu, click *Tools &rarr; Options*. Then, select the *Interpreter* tab. In 'Which interpreter or device should Thonny use for running your code?', select 'MicroPython (ESP32)'. In 'Port', select the serial port connected to the ESP32 board.

{% include image.html url="/learn/assets/post/2020-04-04-martin-ku-getting-started-with-micropython-for-esp32/thonny-interpreter-options.png" description="Select the right board and the right serial port." %}

Then, click 'Open the dialog for installing or upgrading MicroPython on your device' under 'Firmware'. A new window should appear. Select the serial port connected to the ESP32 board in 'Port', and select the firmware file we have downloaded. Make sure that 'Erase flash before installing' is selected. 

{% include image.html url="/learn/assets/post/2020-04-04-martin-ku-getting-started-with-micropython-for-esp32/flashing-firmware.png" description="Select the MicroPython firmware file" %}

Finally, click 'Install' to flash the firmware to the ESP32.

{% include image.html url="/learn/assets/post/2020-04-04-martin-ku-getting-started-with-micropython-for-esp32/flashing-to-esp32.png" description="The esptool will flash the firmware to the ESP32" %}

> **_NOTE:_**  For some ESP32 boards, you may need to push the 'EN' and the 'BOOT' buttons on the board to get the flashing started.

#### Use the REPL

When the firmware is installed to the ESP32, we can use the MicroPython's REPL environment with the Thonny editor. First, click the red 'Stop/Restart backend' button to restart the MicroPython REPL.

> **_NOTE:_**  You can also use the shortcut key 'Ctrl + D' to initiate a soft-reboot of the ESP32 board.

At the bottom of the window, the shell can be used to interact with the REPL directly. Try typing a line of code inside the shell:

```python
print("Hello World")
```

{% include image.html url="/learn/assets/post/2020-04-04-martin-ku-getting-started-with-micropython-for-esp32/thonny-repl-shell.png" description="The REPL shell is really handy for experimenting MicroPython functions." %}

However, the codes inside the REPL are gone everytime the REPL is restarted. So a better way to write our codes is to write them inside the editor (obviously!). Let's write a simple program to flash the onboard LED 10 times.

```python
from machine import Pin
from time import sleep

def flash(led, num_of_times):
    for i in range(num_of_times):
        led.on()
        print('ON')
        sleep(1)
        led.off()
        print('OFF')
        sleep(1)

led = Pin(2, Pin.OUT)
flash(led, 10)
```

You may save the program to your computer as usual. When you encounter the following dialog box, you can just choose 'This Computer'.

{% include image.html url="/learn/assets/post/2020-04-04-martin-ku-getting-started-with-micropython-for-esp32/save-file-options.png" description="You can select where to save the codes" %}

Click the red 'Stop/Restart backend' button to restart the MicroPython REPL to stop the previous running program, if any. Then, click the green 'Run current script' button to run the script.

{% include image.html url="/learn/assets/post/2020-04-04-martin-ku-getting-started-with-micropython-for-esp32/running-script-in-repl.png" description="The script is running in the REPL, and you can see the console output inside the shell." %}

{% include image.html url="/learn/assets/post/2020-04-04-martin-ku-getting-started-with-micropython-for-esp32/led-flash.gif" description="Flashing the on-board LED" %}

#### Save Codes to the Board

As suggested by the dialog box shown when we save a file, we can actually save a file to the ESP32 directly. When a Python file is saved to the ESP32, it can be imported as a Python library as usual. Also, if the Python file is named 'main.py', the codes inside the file will be executed automatically when the board is powered up. That is to say, 'main.py' is like the program we upload to an Arduino board.

{% include image.html url="/learn/assets/post/2020-04-04-martin-ku-getting-started-with-micropython-for-esp32/file-manager-mp-esp32.png" description="We can manage the files on the ESP32 right inside Thonny." %}

#### Conclusion

With this simple setup, we can use MicroPython to write programs for ESP32. Other than controlling the GPIOs, we can use MicroPython to connect to the Internet. Various MicroPython libraries allow us to send HTTP requests, start a web server or even perform co-operative multitasking. Though the performance of MicroPython is not as good as C++, in many cases this is not an issue. Since the codes can just run inside REPL, the debugging process is a lot easier. The combination of MicroPython and ESP32 enables us to do rapid prototyping for IoT devices. 
