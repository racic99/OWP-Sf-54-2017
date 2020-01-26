package aplikacija;

import java.io.IOException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import model.Film;
import model.Projekcija;
import model.Sala;
import model.TipProjekcije;

public class ProjekcijeServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;

	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
	
		List<Film> filmovi = new ArrayList<>();
		List<Sala> sale = new ArrayList<>();
		List<TipProjekcije> tipoviProjekcije = new ArrayList<>();
		List<Projekcija> projekcije = new ArrayList<>();
		
		TipProjekcije tp1 = new TipProjekcije(1, "2D");
		TipProjekcije tp2 = new TipProjekcije(2, "3D");
		TipProjekcije tp3 = new TipProjekcije(3, "4D");
		
		tipoviProjekcije.add(tp1);
		tipoviProjekcije.add(tp2);
		tipoviProjekcije.add(tp3);
		
		Sala sala1 = new Sala(1, "Sala 1", 20, tp1.getNaziv() + "," + tp2.getNaziv());
		Sala sala2 = new Sala(2, "Sala 2", 10, tp3.getNaziv());
		Sala sala3 = new Sala(3, "Sala 3", 5, tp2.getNaziv() + "," + tp3.getNaziv());

		sale.add(sala1);
		sale.add(sala2);
		sale.add(sala3);

		
		Film film1 = new Film(1, "Mrtav ladan", "Stevo", "Milan, Marko", "Zanr1, Zanr2", "90", "Djoka", "Srbija", "2000", "Neki opis", true);
		Film film2 = new Film(2, "Kum", "Marica", "Filip, Stefan", "Zanr3, Zanr4", "120", "Italija prodaksn", "Italija", "2011", "Opis neki", true);
		Film film3 = new Film(3, "Celavi bez ruku za kosu se vuku", "Ivica", "Nemanja, Gojko", "Zanr2, Zanr3", "110", "Ker", "Srbija", "1980", "Opisan film", true);

		filmovi.add(film1);
		filmovi.add(film2);
		filmovi.add(film3);
		
		Projekcija projekcija1 = new Projekcija(1, 1, 1, 1, "02/12/2020 20:00", 300, "zoki", true);
		Projekcija projekcija2 = new Projekcija(2, 2, 2, 2, "02/01/2020 19:00", 350, "zoki", true);
		Projekcija projekcija3 = new Projekcija(3, 3, 3, 3, "03/10/2020 22:00", 400, "zoki", true);

		projekcije.add(projekcija1);
		projekcije.add(projekcija2);
		projekcije.add(projekcija3);

		
		Map<String, Object> data = new LinkedHashMap<>();
		data.put("tipovi", tipoviProjekcije);
		data.put("sale", sale);
		data.put("filmovi", filmovi);
		data.put("projekcije", projekcije);

		request.setAttribute("data", data);
		request.getRequestDispatcher("./SuccessServlet").forward(request, response);

	
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
