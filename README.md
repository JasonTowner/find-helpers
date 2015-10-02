# find-helpers
Lookup paths for handlebars helpers in your fs.

Only one helper by the same name can be used, therefore you should namespace your helpers to reduce likelihood of collisions. The last helper loaded with a specific name will override all previous helpers wit the same name.