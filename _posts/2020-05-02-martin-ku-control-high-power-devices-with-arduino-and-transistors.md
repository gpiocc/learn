---
layout: post
title:  "Control High Power Devices with Arduino and Transistors"
date:   2020-05-02 00:00:01
categories: [arduino]
author: Martin Ku
thumbnail: "2020-05-02-martin-ku-control-high-power-devices-with-arduino-and-transistors.png"
abstract: "By using a simple TIP120 transistor, it is easy to control high power devices with an Arduino while keeping the Arduino undamaged."
---

{% include image.html url="/learn/assets/post/2020-05-02-martin-ku-control-high-power-devices-with-arduino-and-transistors/TIP120.png" description="TIP120 transistor" %}

#### Introduction

An Arduino can power things like LEDs and sensors directly because these things consume very little current. As you can see [in this tutorial about controlling a motor with an Arduino](https://gpiocc.github.io/learn/arduino/2020/03/19/martin-ku-control-a-motor-with-arduino.html), you will need a separate external power to power the motor. Luckily, we can use an H-bridge like the L293D integrated circuit to safely control a motor. However, if we only need to turn something on and off, using an H-bridge seems to be over-complicated.

In fact, if we only need to turn a high power device on and off, the **TIP120** transistor is a much better choice. It is an inexpensive, simple transistor to control the power delivered to a device. TIP120 can handle 5A of current at 60V, which is more than enough for most of the project involving Arduino. Moreover, knowing how TIP120 works is also an excellent way to understand how transistors work in general. 

In this tutorial, we will learn:
*   what a transistor is and how it works,
*   how to use an TIP120 and an Arduino to control turn on and off a high power device.

To achieve these learning outcomes, we will use an TIP120 transistor and an Arduino to turn on and off a computer fan. 

#### Materials and Tools
*   Arduino Uno x 1
*   TIP120 transistor x 1
*   1000 ohm resistor x 1
*   1N4004 diode x 1
*   CPU fan x 1
*   Jumper wire 

> **_NOTE:_**  If you use a hobby motor instead of a computer fan, you may need to use a capacitor to prevent unwanted sparking.

#### Learn the Basic Knowledge about Transistors

While it is completely OK to proceed without the basic knowledge about how a transistor works, you probably should because (1) transistor is absolutely the most important thing in modern electronics and (2) it's not too difficult to understand the basic principle at all. Bipolar transistors such as the TIP120 can be used as switches or current amplifiers. These two things are often involved in microcontroller-based projects. Thus, understanding how a transistor works enables you to build more complicated projects in the future.

Fortunately, you don't need to read a long article to learn the basics about transistors. The following YouTube video from **Learn Engineering** channel is an excellent tutorial for understanding the concepts.

<iframe width="560" height="315" src="https://www.youtube.com/embed/7ukDKVHnac4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>

#### Connect the Circuit

The connection is rather simple:

{% include image.html url="/learn/assets/post/2020-05-02-martin-ku-control-high-power-devices-with-arduino-and-transistors/circuit-tinkercad.png" description="" %}


{% include image.html url="/learn/assets/post/2020-05-02-martin-ku-control-high-power-devices-with-arduino-and-transistors/circuit.png" description="" %}

The circuit connecting the battery and the fan is pretty much the same as a simple circuit, except the TIP120 is also connected to the circuit in series. The collector (the middle leg) is connected to the positive terminal of the battery, and the emitter (the right-most leg) is connected to the positive terminal of the fan. The TIP120 acts like a switch, only this switch is turned on and off by the signal at the base (the left-most leg).

The base of the TIP120 is connected to a PWM pin (say, Pin 3) of the Arduino. To protect the Arduino, a 1000 ohm resistor is added between the base of TIP120 and the PWM pin.

When a motor is turned off, a back emf will be induced to counter the change in current (see Faraday's Law and Lenz's Law for the details). This back emf may damage the TIP120 transistor. Therefore, a diode is added to the circuit. A diode allows current to flow in one direction only (from anode to cathode). The anode and the cathode of the diode are connected to the negative terminal of the fan and the positive terminal of the battery respectively. This will stop the current caused by the back emf from crossing the TIP120 transistor.

{% include image.html url="/learn/assets/post/2020-05-02-martin-ku-control-high-power-devices-with-arduino-and-transistors/diode.png" description="The cathode is indicated by the strip on the diode." %}

#### The Code

The code is pretty straightforward. Just like controlling [the brightness of an LED](https://gpiocc.github.io/learn/arduino/2020/03/08/martin-ku-analog-input-and-output-in-arduino.html) or [the speed of a motor with an L293D integrated circuit](https://gpiocc.github.io/learn/arduino/2020/03/19/martin-ku-control-a-motor-with-arduino.html), the amount of power output can be controlled using PWM signals. In the following Arduino program, we will turn on and off the fan repeatedly with different power output.

```c++
const int BASE = 3;

void setup()
{
  pinMode(BASE, OUTPUT);
}

void loop()
{
  analogWrite(BASE, 128);
  delay(2000);
  analogWrite(BASE, 0);
  delay(2000);
  analogWrite(BASE, 255);
  delay(2000);
  analogWrite(BASE, 0);
  delay(2000);
}
```

After uploading the program to the Arduino, see how the fan moves!

{% include image.html url="/learn/assets/post/2020-05-02-martin-ku-control-high-power-devices-with-arduino-and-transistors/tip-fan.gif" description="Control the fan with TIP120" %}

You may [find the code here](https://github.com/martin-ku-hku/control-high-power-devices-with-arduino-and-transistors/tree/master/tip_fan). If you have any problem, you can ask us on our [Facebook page](https://www.facebook/com/gpiocc).

#### Conclusion

Transistors like TIP120 enable us to control high power devices with the Arduino and other microcontroller. The working principle of bipolar transistors also illustrates why it is possible to control electronic devices with simple signals. For example, [we can control a motor with an Arduino and an L293D integrated circuit](https://gpiocc.github.io/learn/arduino/2020/03/19/martin-ku-control-a-motor-with-arduino.html), but how does this work? You should rethink about this problem with the newly learnt concepts in this tutorial.

Moreover, by adding suitable sensors and networking capability to this design, we may create a wide variety of smart devices. For instance, we may connect a temperature sensor to the Arduino and turn the fan on when the temperature is above the threshold, or we may connect the whole design to a ESP32 and control the fan over the Internet. You have far more possibilities once you master the skills involved in this tutorial.