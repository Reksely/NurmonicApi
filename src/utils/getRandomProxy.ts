import * as fs from 'fs';
import * as path from 'path';

interface UsedProxy {
  proxies: string[];
}


  function getRandomProxy(): string {
    const usedProxiesPath = path.join( 'json', 'usedProxies.json');
    const usedProxiesData = fs.readFileSync(usedProxiesPath, 'utf-8');
    const usedProxies: UsedProxy = JSON.parse(usedProxiesData);
    const proxies = fs.readFileSync('proxies.txt', 'utf-8').split('\n');

    let availableProxies = proxies.filter(proxy => !usedProxies.proxies.includes(proxy));

    if (availableProxies.length === 0) {
      usedProxies.proxies = [];
      availableProxies = proxies;
    }

    const randomProxy = availableProxies[Math.floor(Math.random() * availableProxies.length)];
    
  return randomProxy;
}


export { getRandomProxy };
