# Running locally

Make sure you are using Node 18 or above.

Run the following command:

`corepack enable && pnpm install`

Once the package has been installed, run the following to start locally:
`pnpm start`

# Run through Docker

Build docker image first
`docker build --tag tokenizer .`

Run the docker image, exposing port 3000
`docker run --detach --publish=3000:3000 --name=tokenizer tokenizer:latest`

# API documentation

Swagger doc can be found at docs/api.yaml

You can also use the curl commands below to test: 

Tokenize: 
```bash
curl --request POST \
  --url https://lab.jiangsc.me/test/tokenize \
  --header 'Content-Type: application/json' \
  --data '[
  "4111-1111-1111-1111",
  "4444-3333-2222-1111",
  "4444-1111-2222-3333",
  "4444-3333-2222-1111",
  "4444-1111-2222-3333"
]
'
```
Detokenize:
```bash
curl --request POST \
  --url https://lab.jiangsc.me/test/detokenize \
  --header 'Content-Type: application/json' \
  --data '[
	"ecdb2f20cb0688d40f1",
	"819528513198afb2b93",
	"2109fae663cd971014f",
	"819528513198afb2b93",
	"2109fae663cd971014f"
]'
```
