import org.root.pad.*;
import org.root.data.*;
import org.root.group.*;
import org.root.histogram.*;
import org.root.func.*;
import java.lang.Math;
import java.util.Random;

TDirectory root = new TDirectory();
TDirectory dir1 = new TDirectory("dir1");
TDirectory dir1a = new TDirectory("dir1/dir1a");
TDirectory dir2 = new TDirectory("dir2");
TDirectory dir2a = new TDirectory("dir2/dir2a");
TDirectory dir2b = new TDirectory("dir2/dir2b");

H1D h1 = new H1D("h1", 100, -5, 5);
H2D hh1 = new H2D("hh1", 100, -5, 5, 100, -5, 5);
H1D h1a = new H1D("h1a", 100, -5, 5);
H1D h2 = new H1D("h2", 100, -5, 5);
H1D h2a = new H1D("h2a", 100, -5, 5);
H1D h2b = new H1D("h2b", 100, -5, 5);
H2D hh2b = new H2D("hh2b", 100, -5, 5, 100, -5, 5);

Random r = new Random();

for(int loop = 0; loop < 2250; loop++)
{
   h1.fill(r.nextGaussian());
   h1a.fill(r.nextGaussian());
   h2.fill(r.nextGaussian());
   h2a.fill(r.nextGaussian());
   h2b.fill(r.nextGaussian());
   hh2b.fill(r.nextGaussian(), r.nextGaussian());
}

for(int k = 0; k < 2000; k++)
{
   hh1.fill(0.5*r.nextGaussian()-2, 0.5*r.nextGaussian()+2);
}

for(int k = 0; k < 2000; k++)
{
   hh1.fill(0.5*r.nextGaussian()+2, 0.5*r.nextGaussian()+2);
}

for(int k = 0; k < 2000; k++)
{
	double myRand = r.nextGaussian();
   hh1.fill(1.5*r.nextGaussian(), myRand*myRand - 4.5);
}

dir1.add(h1);
dir1.add(hh1);
dir1a.add(h1a);
dir2.add(h2);
dir2a.add(h2a);
dir2b.add(h2b);
dir2b.add(hh2b);

root.addDirectory(dir2a);
root.addDirectory(dir2b);
root.addDirectory(dir1a);
root.addDirectory(dir1);
root.addDirectory(dir2);

root.writeHipo("testDirectory3.hipo");
