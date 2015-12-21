## Instructions for using the settings.json file
---

Make a file called "settings.json".
You will need to supply your desired admin name and password.
It should look like so:
```
{
  "adminName": "admin",
  "adminPw": "password"
}
```

When running the application for the first time (or after a database reset) you need to
use the `--settings` operand and supply the name of the settings file.

For instance:
```
meteor run --settings settings.json
```

For deployment:
```
meteor deploy --settings settings.json my-site.meteor.com
```
