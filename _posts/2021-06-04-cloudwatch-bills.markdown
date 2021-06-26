---
layout: post
title:  "Get rid of all unwanted CloudWatch alarms to prevent unexpected bills in AWS"
date:  2021-06-04 09:52:41 +530
tags: aws cloud bills
categories: howto
---

So AWS isn't entirely famous for its billing structure. Although AWS Free Tier gives you access to many resources, once you're at a point where you exceed your quota or are at the end of your free tier, things escalate quite quickly. If you're not very careful about it, you might end up shelling out whole lotta money.

I've been working with AWS for about 3 years now and I'm definitely way past my free tier. During my learning time, I've never had any surprise bills thankfully. But I definitely did get a shocker when I received a bill for 1000 bucks out of nowhere a few weeks back. I had been working on a PoC(Proof-of-Concept) on AWS and while working on the project I spun up a couple of VMs, worked with some lambdas and DynamoDB triggers, and CloudWatch alarms. And while I was wrapping up, I may or may not have forgotten to completely remove some of the infrastructure that I spun up.

Now if you're somewhat familiar with the AWS console you would know that digging into what services are active and in what region is a huge pain in the ass, it's not as straightforward as you'd want it to be and that's where all the hidden costs lie.

In my case when I got the bill, the only major section that was billed for was the CloudWatch section. So I needed to find what all alarms were active, and doing it via the console is a pain, so I turned to the AWS CLI and ran the following to get a list of all active cloudwatch alarms, export it to CSV, and then use the CSV to delete the individual alarms:

```bash
aws cloudwatch describe-alarms --query 'MetricAlarms[*].AlarmName' --output text > list.csv
for i in `cat list.csv` ;do aws cloudwatch delete-alarms --alarm-names $i ;done
```