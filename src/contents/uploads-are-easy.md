---
author: Garret Harp
datetime: 2023-05-06
title: Uploads Are Easy
slug: uploads-are-easy
featured: false
draft: false
tags:
  - s3
ogImage: ""
description: Looking for a hassle-free solution for handling file uploads? S3 is your answer! In this blog post, I will show you just how easy it is to upload files with S3 in just a few simple steps. It is way easier than you might think.
---

In this blog post, we explore the simplicity of file uploads with S3 and why services like [Vercel blob](https://vercel.com/storage/blob) and [Uploadthing](https://uploadthing.com/) are not necessary and will only cost you a fortune over using an S3 provider directly. With the help of [Cloudflare R2](https://www.cloudflare.com/products/r2/), I will guide you through the creation of a bucket, generating access keys and secret keys, and how to upload files using a Cloudflare Worker script. This step-by-step guide includes the necessary commands to create a Cloudflare Worker script using Hono, and how to run and deploy your script using Wrangler. In no time, you will see for yourself how easy it is to upload files with S3 and an S3-compatible storage provider. Say goodbye to expensive third-party services and say hello to effortless file uploads with S3.

## Creating the Bucket
The first step is to create a bucket with any service that supports the S3 API. There are many services including [Amazon S3](https://aws.amazon.com/s3/), [Cloudflare R2](https://www.cloudflare.com/products/r2/), [DigitalOcean Spaces](https://www.digitalocean.com/products/spaces), and more. I will be using [Cloudflare R2](https://www.cloudflare.com/products/r2/) for this example because I simply love the Cloudflare ecosystem, and I am a community champion for them.

Here's how to create a bucket with Cloudflare R2:
1. Sign up for a Cloudflare account if you don't already have one. [You can signup here](https://dash.cloudflare.com/sign-up).
2. Once signed up and on the dashboard you can make your way to the [R2 section](https://dash.cloudflare.com/?to=/:account/r2/overview) by clicking on the "R2" tab in the left navigation bar.
3. Click the "[Create Bucket](https://dash.cloudflare.com/?to=/:account/r2/new)" button, and fill out the bucket name and press "Create bucket".

## Generating Access Keys and Secret Keys
Now that you have a bucket, you need to generate an access key and secret key for your bucket. This is what you will use to authenticate with the S3 API. Here's how to generate an access key and secret key with Cloudflare R2:

1. On the [R2 section](https://dash.cloudflare.com/?to=/:account/r2/overview) of the Cloudflare dashboard, click on the "[Manage R2 API Tokens](https://dash.cloudflare.com/?to=/:account/r2/api-tokens)" link at the top right of the screen.
2. Press the "Create API Token" button, and fill out the token name, token TTL, and IP filter. Then press "Create API Token", and save these tokens somewhere safe.

## Uploading Files
Now that you have your access key and secret key, you can get started with the actual code to upload files! In this example I will use a [Cloudflare Worker](https://workers.cloudflare.com/) script. Here's how we can do that:

1. Create a new Cloudflare Worker script using [Hono](https://github.com/honojs/hono) with the following commands:
```bash
npx create-cloudflare uploads-are-easy https://github.com/honojs/hono-minimal
cd uploads-are-easy
npm install
npm install aws4fetch
```

<sub>Note: We are installing the aws4fetch package here to help with creating authenticated calls to the S3 API instead of using the official AWS SDK because the official SDK uses Node APIs that are not supported by Cloudflare Workers.</sub>

2. Open the `src/index.ts` file and replace the contents with the following code:

```ts
import { Hono } from 'hono'
import { AwsClient } from 'aws4fetch'

const app = new Hono()

app.get('/', async c => {
	return c.html(`
		<form action="/" method="POST" enctype="multipart/form-data">
			<input type="file" name="file" />
			<button type="submit">Upload</button>
		</form>
	`)
})

app.post('/', async c => {
	const client = new AwsClient({
		accessKeyId: c.env.R2_ACCESS_KEY_ID,
		secretAccessKey: c.env.R2_SECRET_ACCESS_KEY
	})

	const form = await c.req.formData()

	await client.fetch(`${c.env.R2_BUCKET_URL}/${crypto.randomUUID()}`, {
		method: 'PUT',
		body: form.get('file')
	})

	return c.json({ uploaded: true })
})

export default app
```

As you can see from the code snippet the important part for S3 uploads is this specific portion:
```ts
await client.fetch(`${c.env.R2_BUCKET_URL}/${crypto.randomUUID()}`, {
	method: 'PUT',
	body: form.get('file')
})
```

All it takes is 1 simple PUT call to the S3 API with the contents you want to upload, it really cannot be any easier than that.

<sub>Note: The `crypto.randomUUID()` function is used to generate a random file name for the file that is being uploaded. You can use any file name you want here depending on your specific use case for file uploads.</sub>

3. In order for the code to work we do need to give it our credentials and our bucket url so we need to create a `.dev.vars` file with the following contents:
```
R2_ACCESS_KEY_ID=YOUR_ACCESS_KEY_ID
R2_SECRET_ACCESS_KEY=YOUR_SECRET_ACCESS_KEY
R2_BUCKET_URL=YOUR_BUCKET_URL # https://bucketname.account-id.r2.cloudflarestorage.com
```

4. Now that we have our code and our credentials, we can run the code locally using the following command:
```bash
npm run dev
```

5. Open the URL that is printed in the console, and you should see a form that allows you to upload a file. Once you upload a file, you should see a JSON response that looks like this:
```json
{ "uploaded": true }
```

6. Now you can check your bucket, and you should see the file that you uploaded!

7. (Optional) Deploy your script using Wrangler to a public Cloudflare Worker, to do so you can run the following command:
```bash
npm run deploy
```

## Conclusion
As you can see uploading a file with an S3 compatible storage provider is **very** easy, and there is no need to pay [insane premiums](https://service-markup.vercel.app/) for services that claim they make it easier to uploads files when the reality is S3 is already super easy to use.
