luasLingkaran :: Double -> Double
luasLingkaran r = pi*r*r

volumeTabung :: Double -> Double -> Double
volumeTabung r t = luasLingkaran r * t

--atau

{-
luasLingkaran :: Double -> Double
luasLingkaran r = do 
    let nilaiPi = 22/7
    nilaiPi*r*r
 
volumeTabung :: Double -> Double -> Double
volumeTabung r t = luasLingkaran r * t
-}