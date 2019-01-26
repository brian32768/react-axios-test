I am still learning React but now I am adding Axios.

I am using the OpenStreetMap Nominatim geocoder as a data source.

## Project status

2019-Jan-26

I'm wrestling with form input in React.
The geocoder works fine but I have to feed it good input!

## How to test and develop

### Test
The command `npm start` will launch the test setup in a browser.

I added --no-autoinstall option in package.json to prevent parcel from installing openlayers 4 while I am upgrading the source to ol5. This means (for now anyway) you need to run `npm install` before `npm start` to get the dependencies installed.

### Update git

When I do significant changes I bump the patch version number or possibly the minor version

If the current version in package.json is 0.1.9 then
````npm version patch```` would bump the third digit (eg 0.1.10)
and
````npm version minor```` would bump the second digit (eg 0.2.0)
and in either case, it's all pushed up to github.

The command fails if changes are left uncommitted, so 'git commit' first.
