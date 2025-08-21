How advocate works?
===
pretty simple add the following import to the document header
```
import ProductAdvocate from '/src/___new___/components/ProductAdvocate';
```

add the following code to where you want the advocate to appear
```
<ProductAdvocate />
```

> note you can provide an id to get a specific message for a page.

for exmaple:
```
<ProductAdvocate messageId="ebpf" />
```
this will link your advocate to the id in the `advocacyMessages.ts` file.

How can I change/add/delete a message?
===
navigate to advocacyMessages.ts and do your thing.
