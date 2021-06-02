import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute, Params } from "@angular/router";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"],
})
export class UserComponent implements OnInit, OnDestroy {
  user: { id: number; name: string };
  // rxjs is not shipped with Angular, but it's used. It allows Observable functionality
  paramsSubscription: Subscription;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    // In case we want to change something with the data on the same componen - that we are currently loaded, we need to subsribe.
    // Angular do re-render in that case - it's default action.
    // When we have another link on the same component which refresh or set new parameters, we won't see the changes in HTML. Only URL will change!
    // Check user.component.html and <a> tag
    this.user = {
      id: this.route.snapshot.params["id"],
      name: this.route.snapshot.params["name"],
    };

    // To be able to get data (on subsequent actions) we need to subscribe and tell angular that data has been chaged:
    // "params" here is Observable! - Observales are features added by third party package, which allows you to work with async tasks.
    // Users click on a link on that same component, and we dont know when, how, if and how long it will takes. So we subscribe:
    // 'params' Observable accept's 3 functions. Fist one will be fired when params are changed:
    this.paramsSubscription = this.route.params.subscribe((params: Params) => {
      this.user.id = params["id"];
      this.user.name = params["name"];
    });
  }

  // We don't have to do this, as Angular will do this for us automatically. It's just an example!
  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }
}
