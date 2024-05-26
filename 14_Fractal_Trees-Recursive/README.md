# Cel
Stworzenie fraktalnego drzewa w oparciu o rekurencje

# Czym jest rekurencja?

Jest to technika w której funkcja wywołuje samą siebie by rozwiązać dany problem. Funkcja rekurencyjna zawiera kroki jakie należy wykonać (recursive steps) oraz deklarację momentu kiedy należy zakończyć wykonywanie funkcji (base case).

Przykład obliczania silni za pomocą rekurencji

```js

function recursive(n) => {

if (n === 1) then
return 1

return recursive(n-1) * n

}

```
