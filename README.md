I am still learning React but now I am adding Axios to fetch data.

I am using the OpenStreetMap Nominatim geocoder as a data source.

## Project status

It works!

## How to test and develop

### Test
The command `npm start` will launch the test setup in a browser.

### Update git

When I do significant changes I bump the patch version number or possibly the minor version

If the current version in package.json is 0.1.9 then
````npm version patch```` would bump the third digit (eg 0.1.10)
and
````npm version minor```` would bump the second digit (eg 0.2.0)
and in either case, it's all pushed up to github.

The command fails if changes are left uncommitted, so 'git commit' first.
