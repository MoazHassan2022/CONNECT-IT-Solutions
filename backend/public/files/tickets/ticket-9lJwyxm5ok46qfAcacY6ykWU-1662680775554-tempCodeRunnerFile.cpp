#include<set>
#include<map>
#include<list>
#include<iomanip>
#include<cmath>
#include<string>
#include<vector>
#include<queue>
#include<stack>
#include<complex>
#include<sstream>
#include<iostream>
#include<fstream>
#include<algorithm>
#include<numeric>
#include<utility>
#include<functional>
#include<stdio.h>
#include<assert.h>
#include<memory.h>
#include<bitset>
#include<cstring>


using namespace std;

#define Waer				ios_base::sync_with_stdio(0);cin.tie(0);cout.tie(0);
#define all(v)				((v).begin()), ((v).end())
#define rall(v)				((v).rbegin()), ((v).rend())
#define sz(v)				((int)((v).size()))
#define fil(v, d)			memset(v, d, sizeof(v))
#define rep(i, v)			for(int i=0;i<sz(v);++i)
#define lp(i, n)			for(int i=0;i<(int)(n);++i)
#define lpi(i, j, n)		for(int i=(j);i<(int)(n);++i)
#define lpd(i, j, n)		for(int i=(j);i>=(int)(n);--i)
#define sq(x)				x * x
#define Mod(x,Mod)			(x<0)?(x % Mod + Mod) : (x % Mod)
#define cin(vec) for(auto& i : vec) cin >> i;
#define cin_2d(vec, n, m) for(int i = 0; i < n; i++) for(int j = 0; j < m && cin >> vec[i][j]; j++);
#define coutv(vec) for(auto& i : vec) {cout << i << " " ; cout << "\n";}
#define couth(vec) for(auto& i : vec) {cout << i << " " ;}
#define cout_2d(vec, n, m) for(int i = 0; i < n; i++, cout << "\n") for(int j = 0; j < m && cout << vec[i][j] << " "; j++);

const int OO = (int)1e6;
const double EPS = (1e-7);
double const pi = 3.14159265359;

int dcmp(double x, double y) { return fabs(x - y) <= EPS ? 0 : x < y ? -1 : 1; }
int gcd(int a, int b)   { return b == 0 ? a : gcd(b, a % b); }
int lcm (int a, int b) { return  (a * b) / gcd(a,b); }

#define pb					push_back
#define MP					make_pair
typedef long double   	  ld;
typedef long long int    ll;
typedef unsigned long long    ull;
typedef vector<int>       vi;
typedef vector<ll>        vl;
typedef vector<bool>      vb;
typedef vector<double>    vd;
typedef vector<char>	  vc;
typedef vector<string>    vs;
typedef vector< vc >      vvc;
typedef vector< vi >      vvi;
typedef vector< vb >      vvb;
typedef vector< vd >      vvd;

/*
vector<int> adj[100005];
bool vis[100005];

bool bfs(int s){
    int che = 0;
    list<int> queue;
    vis[s] = true;
    queue.push_back(s);
    while(!queue.empty())
    {
        s = queue.front();
        queue.pop_front();
        for (auto adjecent: adj[s])
        {
            if (!vis[adjecent])
            {
                vis[adjecent] = true;
                queue.push_back(adjecent);
                che++;
            }
        }
    }
    return che&1;
}

ll fastPower(ll b,ll p)
{
    if(p==1)return b;
    ll halfpower= fastPower(b,p/2);
    ll ret=halfpower * halfpower;
    if(p%2)ret=b;
    return ret;
}
*/
  
int a[105];

void go_waer_go() {
    int n;scanf("%d",&n);
    for (int i=1;i<=n;i++)
        scanf("%d",&a[i]);
    int ans=0;
    int k=a[1];
    if (k == 0) ans++;
    for (int i=1;i<n;i++)
    {
        if (( k ^ a[i+1] ) !=3 && k != 3 && a[i+1] != 0) k = k ^ a[i+1];
        else k=3 && a[i+1] ;
        if (k==0) ans++;
    }
    printf("%d",ans);
}

int main()
{
	Waer;
    /*
    freopen("input.txt", "r", stdin);
    freopen("output.txt", "w", stdout);
    */
    int t = 1;
    //cin >> t;
    while(t--)
    {
        go_waer_go();
        //printf( "%lld\n" , go_waer_go());
    }

 
    return 0;
}
