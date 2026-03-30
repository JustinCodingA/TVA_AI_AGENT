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
    name: "get_epic",
    pattern: "/analyze/{project}/{epic_title}/{iteration}",
    defaults: new {controller="Home", action="Get_Stories_By_Epic"}).WithRequestTimeout(TimeSpan.FromSeconds(300));

app.MapControllerRoute(
    name: "test_it",
    pattern: "/iteration/{iter}",
    defaults: new {controller="Home", action="Iterate"});


app.Run();
