# Ретраер
Пример простого использования
```typescript
const myPromiseFn = () => new Promise((resolve, reject) => {
   reject(new Error("Some error")) 
});

withRetryer("myRtryerName", () => myPromiseFn());
```