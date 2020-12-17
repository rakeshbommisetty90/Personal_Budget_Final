import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { DataService } from '../data.service';
import { Router } from '@angular/router';


@Component({
  selector: 'pb-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})

export class HomepageComponent implements OnInit {

  public dataSource = {
    datasets: [
        {
            data: [],
            backgroundColor: [  ]
        }
    ],
    labels: []
};
 constructor(private dataService: DataService, private router: Router) { }
  ngOnInit(): void {
    // Making the subscribe call for the first pie chart. Here the value is fetched from data source.
    // The data.service file has the handling for the API call.
    this.dataService.getBudgetData()
    .subscribe((res: any) => {
      console.log(res);
      for (let i = 0; i < res.length; i++) {
       this.dataSource.datasets[0].data[i] = res[i].budget;
       this.dataSource.labels[i] = res[i].title;
       this.dataSource.datasets[0].backgroundColor[i] = res[i].color;
       this.createChart();
      }
    });
    }
    createChart(){
      var ctx : any = document.getElementById('myChart');
      var myPieChart = new Chart(ctx, {
          type: 'pie',
          data : this.dataSource
      });
  }

    navigateToAddBudget(){
      this.router.navigate(['/addbudget']);
    }

    callNgOnInit(){
      this.ngOnInit();
    }

}
