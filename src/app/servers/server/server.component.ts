import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Params, Router, Data } from "@angular/router";

import { ServersService } from "../servers.service";

@Component({
  selector: "app-server",
  templateUrl: "./server.component.html",
  styleUrls: ["./server.component.css"],
})
export class ServerComponent implements OnInit {
  server: { id: number; name: string; status: string };

  constructor(
    private serversService: ServersService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    // Load server using Resolver and return server data.
    // Idea here is to get data asyncronosly from remote location, show spiner and then display data.
    this.route.data.subscribe((data: Data) => {
      // "server" configured in app-routing.module -> resolve: { server: ServerResolver },
      this.server = data["server"];
    });

    // Load server via URL parameters and return server data.
    // const id = +this.route.snapshot.params['id'];
    // this.server = this.serversService.getServer(id);
    // this.route.params
    //   .subscribe(
    //     (params: Params) => {
    //       this.server = this.serversService.getServer(+params['id']);
    //     }
    //   );
  }

  onEdit() {
    this.router.navigate(["edit"], {
      relativeTo: this.route,
      queryParamsHandling: "preserve",
    });
  }
}
