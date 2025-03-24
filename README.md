    Version 4:

Quick note if you download this repository as-is, check the Startup projects 
in Visual Studio so that both projects start.  Right click the solution, 
choose Configure Startup Projects, and ensure both client and server 
projects are set to Start for the Action.

    Software:

    Visual Studio Community Edition
    https://visualstudio.microsoft.com/vs/community/

    Visual Studio Code
    https://code.visualstudio.com/download

    Node.js
    https://nodejs.org/en/download

    Git
    https://git-scm.com/downloads

    Angular CLI
    https://angular.dev/tools/cli/setup-local
    npm install -g @angular/cli

    Npm-check-updates
    npm i npm-check-updates

    Entity Framework tools
    https://learn.microsoft.com/en-us/ef/core/cli/dotnet
    dotnet tool install --global dotnet-ef

Steps:

1   Create a new project.
    Select Angular and ASP.NET Core.
    I called it Starter.
    Put in C:\Projects.
    .Net 9, Configure for HTTPS, Enable OpenAPI, Do not use top-level statements, Use Controllers.
    Close out of Visual Studio.

2   Upgrade the Angular project to current.
    Move the contents of starter.client to C:\Projects\OldStarter.
    Copy the contents of C:\Projects\StarterSource\01-starter.client to
    C:\Projects\Starter\starter.client.

3   Add the Microsoft SPA, https, and http ports to the Angular project.
    Find the SPA, https, and http ports in the Starter.Server to copy to starter.client:
    Source: Starter.Server\Properties\launchsettings.json has http port, L8, and https port, L18
    Source: Starter.Server\Starter.Server.csproj has SPA port, L9

    Target: starter.client\.vscode\launch.json:L8 and L15 make SPA port
    Target: starter.client\angular.json, L76, SPA port
    Target: starter.client\src\proxy.conf.js, L4, https port

4   Show a running app, essentially Hello World.
    Launch VS and debug the project.  It should show the weather forecast.  Might need a refresh.

5   Add the necessary Nuget packages.
    Stop debugging.  Right click Starter.Server-> Dependencies-> Manage Nuget Packages.
    Click Browse and install the following:

    Microsoft.EntityFrameworkCore.Design
    Npgsql.EntityFrameworkCore.PostgreSQL
    Microsoft.AspNetCore.Identity.EntityFrameworkCore
    Scalar.AspNetCore

6   Add the database context and entity.
    Fire up Pgadmin.  Check the database and table.
    Copy StarterSource\02-database\DbContext.bat to Starter.Server folder.
    Add settings for appsettings.json connection string (copy from file)
    Build project
    Copy DbContext.bat to Starter.Server folder and run it from a command line
    That creates Models, DbContext, and Entities folders with files.
    Add database connection settings to Program.cs

7   Test API (OpenAPI -> Scalar not Swagger)
    Add Scalar.AspNetCore in Nuget (as above)
    Add to Program.cs

    if( app.Environment.IsDevelopment()) {
        app.MapOpenApi();
        app.MapScalarApiReference();
    }

    Can add to launchsettings.json

    "launchBrowser": true, "launchUrl": "scalar/v1"

8   Add the Product API controller.
    Right click Controllers folder, select New Controller
    Select API-> API Controller with read/write actions
    Name it ProductController.
    Configure Product Controller GET, POST, PUT, DELETE (Retrieve, Create, Update, Delete)

9   Test the API CRUD endpoints:
    View-> Other Windows-> Endpoints Explorer.
    Right click and generate GET request so we can test it.
    Also when you run the project, Scalar should now show.  Test CRUD there.
    Also add "/api/**" to /src/proxy.conf.js next to "/weatherforecast",

10  Angular side of things.  Create a Product Service.
    ng g s services\product
    creates the product.service.ts file

    Add Get, GetById(), create, update, delete methods

11  Create a products feature component
    ng g c features\products
    creates the products.component.ts file

    inject the product service, get the products, and display them.

12  Add the route in app.routes.ts
    export const routes: Routes = [
        {path: '', redirectTo: 'products', pathMatch: 'full'},
        {path: 'products', component: ProductsComponent}, // List of products
        {path: 'newproduct', component: NewProductComponent}, // Add a new product
        {path: 'editproduct/:id', component: EditProductComponent}, // Edit a product
    ];

13  Create the EditProduct component:
    ng g c features\products\editproduct

    This will create Editproduct instead of EditProduct, but an easy fix.
    Editproduct -> EditProduct

14  Add Forms and validators

15  Add loading existing product to edit

