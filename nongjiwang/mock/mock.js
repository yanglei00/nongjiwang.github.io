module.exports = {
  rules: [
    {
      pattern: /\/api\/getLivelist.php\?rtype=origin$/,
      respondwith: './livelist.json'
    },
    {
      pattern: /\/api\/getLivelist.php\?rtype=refresh$/,
      respondwith: './livelist-refresh.json'
    },
    {
      pattern: /\/api\/getLivelist.php\?rtype=more$/,
      respondwith: './livelist-more.json'
    },
    {
      pattern: /\/api\/getLivelist.php\?rtype=list1-origin$/,
      respondwith: './livelist-list1-origin.json'
    },
    {
      pattern: /\/api\/getLivelist.php\?rtype=list1-more$/,
      respondwith: './livelist-list1-more.json'
    },
    {
      pattern: /\/api\/getLivelist.php\?id=34979$/,
      respondwith: './details1.json'
    }
  ]
};
