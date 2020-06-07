---
layout: post
title:  "Send Notifications from ESP32 to Telegram with IFTTT"
date:   2020-06-06 00:00:01
categories: [micropython, esp]
author: Martin Ku
thumbnail: "2020-06-06-martin-ku-send-notifications-from-esp32-to-telegram-with-ifttt.png"
abstract: "With IFTTT, we can send notifications to Telegram according to the data from the sensors connected to ESP32."
---

{% include image.html url="/learn/assets/post/2020-06-06-martin-ku-send-notifications-from-esp32-to-telegram-with-ifttt/esp32-phone-telegram.png" description="Messages from ESP32 to your phone!" %}

#### Introduction

Wouldn't it be nice if your IoT devices can send notifications to your phone you when they detect something unusual or they are about to perform some actions? Since ESP32 can connect to the Internet, we can use different IoT platforms to help us exchange data across different devices. Previously, we use Adafruit IO to [store data from ESP32](https://gpiocc.github.io/learn/micropython/esp/2020/05/23/martin-ku-upload-sensor-data-to-adafruit-io-with-esp32-and-micropython.html), as well as to [get input from a smartphone](https://gpiocc.github.io/learn/micropython/esp/2020/05/30/martin-ku-control-neopixels-over-the-internet-with-esp32-and-micropython.html). 

This time, we will use another IoT platform called [IFTTT](https://ifttt.com). IFTTT integrates a wide range of online services, so it is possible to use one online service (say, Twitter) to trigger a chain of events in other services (say, Gmail or Facebook). In particular, we will use a very versatile IFTTT service called **Webhooks** to send messages from ESP32 to a smartphone.

In this tutorial, you will learn:
*   how to create an applet on IFTTT,
*   how to send a message from ESP32 to Telegram via IFTTT.

We will use [a DHT11 sensor to measure temperature and humidity](https://gpiocc.github.io/learn/micropython/esp/2020/05/09/martin-ku-measure-temperature-and_humidity-with-esp32-and-micropython.html) with an ESP32, and send the data to Telegram periodically via IFTTT.

{% include image.html url="/learn/assets/post/2020-06-06-martin-ku-send-notifications-from-esp32-to-telegram-with-ifttt/esp32-telegram-dht.png" description="Temperature and humidity sent to your phone!" %}

#### Materials and Tools

*   ESP32 x 1
*   DHT11 x 1
*   Jumper wires

#### Prerequisites

There are a few tutorials that you can read to get yourself ready for this tutorial.

1.  If you have not installed the Thonny IDE to your computer or flashed the MicroPython firmware to the ESP32, you should follow [this tutorial](https://gpiocc.github.io/learn/micropython/esp/2020/04/04/martin-ku-getting-started-with-micropython-for-esp32.html) to do so. 
2.  If you want to know how to use the DHT11 sensor with MicroPython and ESP32, you can take a look of [this tutorial](https://gpiocc.github.io/learn/micropython/esp/2020/05/09/martin-ku-measure-temperature-and_humidity-with-esp32-and-micropython.html). 
3.  If you want to know how to use ESP32 and MicroPython to send HTTP requests, you can check out [this tutorial](https://gpiocc.github.io/learn/micropython/esp/2020/05/23/martin-ku-upload-sensor-data-to-adafruit-io-with-esp32-and-micropython.html). 

> **_NOTE:_**  While it's not a must, some understanding on HTTP will help you complete this tutorial. Check out [this tutorial](https://gpiocc.github.io/learn/arduino/esp/2020/04/25/martin-ku-create-a-simple-web-server-with-esp32-and-arduino-ide.html) if you need a brief review on HTTP.

#### Create a Webhooks applet in IFTTT

First, you need to register a free account on [IFTTT](https://ifttt.com). Also, to connect Telegram to IFTTT, you need to install [Telegram](https://telegram.org) on your computer.

After logging to IFTTT, click the 'head' icon at the top right hand corner to see the menu. In the menu, click ***Create***.

{% include image.html url="/learn/assets/post/2020-06-06-martin-ku-send-notifications-from-esp32-to-telegram-with-ifttt/ifttt-home.png" description="IFTTT Home page" %}

On the 'Create' page, you can see 'If This Then That' (this is what IFTTT stands for). As the name implies, we need to set up a trigger ('if this') and the corresponding action ('then that') for an applet. To add a trigger, click the '+' between 'If' and 'This'. 

{% include image.html url="/learn/assets/post/2020-06-06-martin-ku-send-notifications-from-esp32-to-telegram-with-ifttt/ifttt-create.png" description="If this then that" %}

As you can see, there are a wide variety of services that can be used as the trigger.

{% include image.html url="/learn/assets/post/2020-06-06-martin-ku-send-notifications-from-esp32-to-telegram-with-ifttt/ifttt-services.png" description="Some services available in IFTTT" %}

In the search field, type 'Webhooks'. Then, click the ***Webhooks*** icon.

{% include image.html url="/learn/assets/post/2020-06-06-martin-ku-send-notifications-from-esp32-to-telegram-with-ifttt/ifttt-webhooks.png" description="Webhooks" %}

Follow the steps below to set up the applet.

##### 1.   Add Webhooks Service to IFTTT 

{% include image.html url="/learn/assets/post/2020-06-06-martin-ku-send-notifications-from-esp32-to-telegram-with-ifttt/ifttt-connect-webhooks.png" description="" %}

Click the ***Connect*** button. We need to enable Webhooks service in the IFTTT account in order to use this.

{% include image.html url="/learn/assets/post/2020-06-06-martin-ku-send-notifications-from-esp32-to-telegram-with-ifttt/ifttt-receive-web-request.png" description="" %}

Then, click ***Receive a web request***. As mentioned in the description, the trigger is fired when an HTTP request with a specific URL is sent to IFTTT.

{% include image.html url="/learn/assets/post/2020-06-06-martin-ku-send-notifications-from-esp32-to-telegram-with-ifttt/ifttt-webhooks-event-name.png" description="" %}

Enter the event name to create the trigger. Let's just call it 'esp32' for simplicity.

##### 2.   Add Telegram Service to IFTTT

{% include image.html url="/learn/assets/post/2020-06-06-martin-ku-send-notifications-from-esp32-to-telegram-with-ifttt/ifttt-webhooks-then-that.png" description="" %}

Click the '+' between 'then' and 'that'.

{% include image.html url="/learn/assets/post/2020-06-06-martin-ku-send-notifications-from-esp32-to-telegram-with-ifttt/ifttt-telegram-then.png" description="" %}

Again, we can choose from a wide variety of services for the corresponding action. Enter 'Telegram' in the search field, and click the ***Telegram*** icon.

{% include image.html url="/learn/assets/post/2020-06-06-martin-ku-send-notifications-from-esp32-to-telegram-with-ifttt/ifttt-telegram-connect.png" description="" %}

Click the ***Connect*** button. At the stage, Telegram needs to be launched.

{% include image.html url="/learn/assets/post/2020-06-06-martin-ku-send-notifications-from-esp32-to-telegram-with-ifttt/ifttt-launch-telegram.png" description="" %}

Click ***SEND MESSAGE*** to launch Telegram.

When Telegram is launched, the IFTTT chatbot will be opened. Click the ***Start*** button in the chatbot.

{% include image.html url="/learn/assets/post/2020-06-06-martin-ku-send-notifications-from-esp32-to-telegram-with-ifttt/telegram-ifttt-bot.png" description="" %}

Then, click 'Authorize IFTTT' to allow IFTTT to send messages to Telegram.

{% include image.html url="/learn/assets/post/2020-06-06-martin-ku-send-notifications-from-esp32-to-telegram-with-ifttt/telegram-authorize-ifttt.png" description="" %}

The Telegram service is then added to your IFTTT account. Click the ***Back*** button at the top left hand corner. Search 'Telegram' and click the ***Telegram*** icon again. This time, there are a few actions that we can use.

{% include image.html url="/learn/assets/post/2020-06-06-martin-ku-send-notifications-from-esp32-to-telegram-with-ifttt/telegram-ifttt-action.png" description="" %}

Click the ***Send message*** button.

##### 3.    Configure the Telegram Action

We can configure a template for the message sent from IFTTT to Telegram. In the 'Message text' section, we can write the template. We can use `{{Value1}}`, `{{Value2}}`, etc., to represent the parameters (data) sent to IFTTT. These will be replaced by the actual values when the message is sent to Telegram. We can use the following as the template to display the temperature and the humidity in a Telegram message.

```
What: {{EventName}}<br>
When: {{OccurredAt}}<br>
Temperature: {{Value1}}, Humidity: {{Value2}}
```

> **_NOTE:_**  We can add HTML tags to stylize the message.

{% include image.html url="/learn/assets/post/2020-06-06-martin-ku-send-notifications-from-esp32-to-telegram-with-ifttt/telegram-ifttt-template.png" description="" %}

Click ***Create Action*** when it's done. 

Finally, click the ***Finish*** button to create the Applet.

{% include image.html url="/learn/assets/post/2020-06-06-martin-ku-send-notifications-from-esp32-to-telegram-with-ifttt/telegram-ifttt-complete.png" description="" %}

#### Get the URL

In IFTTT, click the 'head' button at the top right hand corner to see the menu, and select ***My Services***. Then, select ***Webhooks***.

{% include image.html url="/learn/assets/post/2020-06-06-martin-ku-send-notifications-from-esp32-to-telegram-with-ifttt/webhooks-service.png" description="" %}

You can see the Applet we just created. Click ***Documentation*** at the top. A new page is opened, and an URL is shown on that page.

{% include image.html url="/learn/assets/post/2020-06-06-martin-ku-send-notifications-from-esp32-to-telegram-with-ifttt/webhooks-url.png" description="" %}

Replace `{event}` with `esp32` (which is the event name we set for the applet) and copy the URL. We will use this URL to send data to IFTTT in the Python program.

#### Send Notifications from ESP32

Connect the DHT11 sensor to ESP32 as shown in the table.

<hr>

DHT11 sensor | ESP32 |
:---------: | :-----: |
VCC         | 3.3V
GND         | GND
DATA        | Pin 15

<hr>

Then, we write the Python program. First, we import the libraries and the functions that we need to use.

```python
import network
import urequests as requests
from machine import Pin
from dht import DHT11
from time import sleep
```

Next, we define a few constants.

```python
wifi_ssid = "YOUR_WIFI_SSID"
wifi_password = "YOUR_WIFI_PASSWORD"
webhook_url = "https://maker.ifttt.com/trigger/esp32/with/key/YOUR_IFTTT_KEY"
```

You should replace the strings of the variables `wifi_ssid`, `wifi_password` and `webhook_url` with your own Wifi SSID, Wifi password and Webhooks URL copied in the last step.

Then, we connect the ESP32 to the Wifi station and create an object of DHT11 class.

```python
sta_if = network.WLAN(network.STA_IF)
sta_if.active(True)
sta_if.connect(wifi_ssid, wifi_password)
while not sta_if.isconnected():
    print(".", end = "")

dht11 = DHT11(Pin(15))
```

After that, we can create the main loop with the `while` keyword.

```python
while True:
```

In the main loop, we first measure the temperature and the humidity.
```python
    dht11.measure()
    temperature = dht11.temperature()
    humidity = dht11.humidity()
```

Then, we construct and send an HTTP request. Since we use HTTP `GET` to send the data to IFTTT, the parameters are directly attached to the URL. `?` is appended to the URL first, and each parameter is appended to the URL in the form of `parameter_name=variable_value`. Two parameters are separated by `&`.

In Webhooks, the names of the parameters are `value1`, `value2`, `value3`, etc., so we can construct the URL as follows:

```python
    url = webhook_url + "?value1=" +  str(temperature) + "&value2=" + str(humidity)
```

Note that `temperature` and `humidity` are numbers, so they need to be converted into strings before being appended to the URL string.

Finally, we send the HTTP request.

```python
    try:
        r = requests.get(url)
        print(r.text)
    except Exception as e:
        print(e)
    sleep(300)
```

This will send a message to Telegram with the temperature and the humidity every 5 minutes.

Press `Ctrl + F2` to restart the MicroPython REPL, then press `F5` to run the script in Thonny. The program will start sending messages to Telegram!

{% include image.html url="/learn/assets/post/2020-06-06-martin-ku-send-notifications-from-esp32-to-telegram-with-ifttt/telegram-receive-message.gif" description="Notifications from ESP32 to Telegram" %}

You may find [the sample code here](https://github.com/martin-ku-hku/send-notifications-from-esp32-to-telegram-with-ifttt/blob/master/esp32-ifttt-telegram.py), and ask us on [our Facebook page](https://www.facebook.com/gpiocc) if you have any problems.

#### Conclusion

Webhooks in IFTTT is a simple way to send notifications to smartphones. Other than Telegram, we can use other services like Line and Gmail to receive notifications. Since a trigger can be fired by a simple HTTP `GET` request, Webhooks in IFTTT can be used in many scenarios as long as Internet access is available. You may try it with Raspberry Pi, ESP8266 or even Arduino with the Ethernet shield by yourself.
