# Node HMAC validator project

### Step-by-Step to validate

#### 1. Generate hash from data

Access the site

🔗 [Free Online HMAC Generator](https://www.freeformatter.com/hmac-generator.html)

Select the option **SHA-256**, set the **Body** and the **SecretKey** in the corresponding fields, and compare the result with the hash received.

#### 2. Define information in the request

Set the same data in the curl data property and the hash generated above in the `x-webhook-hash`.

```bash
curl --request POST \
  --url 'http://localhost:3000/validate' \
  --header 'Content-Type: application/json' \
  --header 'x-webhook-hash: ${HASH}' \
  --data '${BODY}'
```

The result needs be success in this specific scenario.

You can check up the failure result changing the header hash or data body.

**Important**

Set the same **SecretKey** in the application.

### Curl examples setting SecretKey(123) 

#### Scenario with success response

```bash
curl --request POST \
  --url 'http://localhost:3000/validate' \
  --header 'Content-Type: application/json' \
  --header 'x-webhook-hash: cf4c716f4a4d939f08dc1c3f64672acfea45e820e8caf98379ac8d6b24524556' \
  --data '{"nome": "teste"}'
```

#### Scenario with failure response

```bash
curl --request POST \
  --url 'http://localhost:3000/validate' \
  --header 'Content-Type: application/json' \
  --header 'x-webhook-hash: cf4c716f4a4d939f08dc1c3f64672acfea45e820e8caf98379ac8d6b24524556' \
  --data '{"nome": "teste2"}'
```