using dotenv.net;
DotEnv.Load();

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllersWithViews();
builder.Services.AddRequestTimeouts();

var app = builder.Build();



// Configure the HTTP request pipeline.
if (!app.Environment.IsDevelopment())
{
    app.UseExceptionHandler("/Home/Error");
    // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseRouting();

app.UseAuthorization();

app.MapStaticAssets();

app.MapControllerRoute(
    name: "default",
    pattern: "{controller=Home}/{action=Index}/{id?}")
    .WithStaticAssets();

app.MapControllerRoute(
    name: "get_analysis",
    pattern: "/analyze/{project}/{epic_title}/{area}/{tags?}",//tags like ?tags=as,df,gh (no space)
    defaults: new {controller="Home", action="Analyze_Stories_By_Epic"}).WithRequestTimeout(TimeSpan.FromSeconds(300));

app.MapControllerRoute(
    name: "area-test",
    pattern: "/area",
    defaults: new {controller="Home", action="Area"});

app.MapControllerRoute(
    name: "fetch_epics_by_project_area",
    pattern: "/epics/{project}/{area}",
    defaults: new {controller="Home", action="Get_Epics_By_Project_Area"});



app.Run();
