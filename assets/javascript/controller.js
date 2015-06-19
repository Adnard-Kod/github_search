function HttpRequest (user) {};

HttpRequest.prototype = {
  bindEvents: function () {
    $('#GetResults').on('submit', function (e) {
      e.preventDefault();
      var owner = $("#owner").val();
      var title = $("#title").val();
      this.get(owner, title)
      }.bind(this));
    },
  get: function (owner, title) {
    $.ajax({
     url: 'https://api.github.com/repos/' + owner + '/'+ title +'/issues',
     type: 'GET',
     success: function(data) {
      this.createIssue(data)
     },
     error: function() {
       alert("error happened");
     },
     createIssue: function (data) {
        for (var i = data.length - 1; i >= 0; i--) {
          var num = data[i].number;
          var title = data[i].title;
          var createdAt = data[i].created_at;
          var issue = new GithubIssue({number: data[i].number, title: title, createdDate: createdAt });
          this.createIssueList(issue)
          };
       },
       createIssueList: function (issue) {
          var list = new GithubIssueList()
          list.add(issue)
       }
    });
  }
}

// https://api.github.com/repos/kinduff/spree_reffiliate/issues


