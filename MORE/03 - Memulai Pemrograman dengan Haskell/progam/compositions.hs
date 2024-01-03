f :: Int -> Int
f x = (x^2) - x + 1
 
g :: Int -> Int
g x = (3*x) - 2

-- f(g 5)
-- (f . g) 5