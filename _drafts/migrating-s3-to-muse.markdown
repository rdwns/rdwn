---
layout: post
title:  "Migrating videos from AWS S3 to Muse.AI"
date:   2021-03-04 10:22:47 +530
categories: cloud
---

So I recently faced a problem where I had a shit ton of videos stored on AWS S3 and the videos were being used RAW for streaming
Now that isn't a best practice but didn't have the time to set up AWS Transcode Pipelines

So to deal with that I had a very hacky method to migrate everything from AWS S3 to Muse.AI