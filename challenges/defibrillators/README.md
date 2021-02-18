# Defibrillators

Created by [@Divlo](https://github.com/Divlo) on 18 February 2021.

## Instructions

### Goals

The city of Montpellier has equipped its streets with defibrillators to help save victims of cardiac arrests. The data corresponding to the position of all defibrillators is available online.

Based on the data we provide in the tests, write a program that will allow users to find the defibrillator nearest to their location using their mobile phone.

### Rules

The input data you require for your program is provided in text format.

This data is comprised of lines, each of which represents a defibrillator. Each defibrillator is represented by the following fields:

- A number identifying the defibrillator
- Name
- Address
- Contact Phone number
- Longitude (degrees)
- Latitude (degrees)

**Note 1**: These fields are separated by a semicolon (;).

**Note 2**: Beware: the decimal numbers use the comma (,) as decimal separator. Remember to turn the comma (,) into dot (.) if necessary in order to use the data in your program.

### Distance

The distance `d` between two points `A` and `B` will be calculated using the following formula:

![Distance Formula](./distance-formula.png)

**Note**: Note: In this formula, the latitudes and longitudes are expressed in **radians**. 6371 corresponds to the radius of the earth in km.

**Note 2**: To convert radian to degrees : (π /180)

The program will display the name of the defibrillator located the closest to the user’s position. This position is given as input to the program.

The `solution` function takes 3 parameters :

- `userLongitude` (in degrees)
- `userLatitude` (in degrees)
- `defibrillators` array of strings with the following format : `1;Maison de la Prevention Sante;6 rue Maguelone 340000 Montpellier;;3,87952263361082;43,6071285339217`

### Example

```js
solution('3,879483', '43,608177', [
  '1;Maison de la Prevention Sante;6 rue Maguelone 340000 Montpellier;;3,87952263361082;43,6071285339217',
  '2;Hotel de Ville;1 place Georges Freche 34267 Montpellier;;3,89652239197876;43,5987299452849',
  '3;Zoo de Lunaret;50 avenue Agropolis 34090 Mtp;;3,87388031141133;43,6395872778854'
])
```

It should returns `"Maison de la Prevention Sante"`.

## Source

[CodinGame - Defibrillators](https://www.codingame.com/training/easy/defibrillators)

## Examples

See the `input-output.json` file for examples of input/output.
