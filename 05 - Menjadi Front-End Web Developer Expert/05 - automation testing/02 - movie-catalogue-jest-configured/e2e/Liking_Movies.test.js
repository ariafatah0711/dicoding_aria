Feature("Liking Movies");

Scenario("test something", ({ I }) => {
  Before(({ I }) => {
    I.amOnPage("/#/like");
  });

  Scenario("showing empty liked movies", ({ I }) => {
    I.seeElement("#query");
    I.see("Tidak ada film untuk ditampilkan", ".movie-item__not__found");
  });

  Scenario("liking one movie", ({ I }) => {
    I.see("Tidak ada film untuk ditampilkan", ".movie-item__not__found");
    I.amOnPage("/");
  });
});
