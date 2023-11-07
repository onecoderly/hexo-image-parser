"use strict";

// match markdown image and covert to hexo valid image path
hexo.extend.filter.register("before_post_render", function (data) {
  // typora markdown path: ![label](folder/filename.png) -> ![label](filename.png)
  data.content = data.content.replace(
    /!{1}\[([^\[\]]*)\]\((\S*)\s?(?:".*")?\)/g,
    function (match_str, label, path) {
      if (path.split("/").length == 3 && path.substring(0, 2) == "./") {
        return '{% asset_img "' + path.split("/")[2] + '" "' + label + '" %}';
      } else if (path.split("/").length == 2) {
        return '{% asset_img "' + path.split("/")[1] + '" "' + label + '" %}';
      } else {
        return match_str;
      }
    }
  );

  // typora img path: <img src="folder/filename.png" zoom="33%"/>
  data.content = data.content.replace(
    /src="(.*?)"/g,
    function (match_str, path) {
      if (path.split("/").length == 2) {
        return `src="${path.split("/")[1]}"`;
      } else {
        return match_str;
      }
    }
  );
  return data;
});
