package aplikacija;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import baza.FilmDAO;
import baza.KorisnikDAO;
import baza.ProjekcijaDAO;
import model.Film;
import model.Korisnik;
import model.Projekcija;

public class DodavanjeProjekcijeServlet extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

		String prijavljenKorisnikKorime = (String) request.getSession().getAttribute("prijavljenKorisnik");
		if (prijavljenKorisnikKorime == null) {
			request.getRequestDispatcher("./LogoutServlet").forward(request, response);
			return;
		}
		Korisnik prijavljenKorisnik = KorisnikDAO.getPrijavljen(prijavljenKorisnikKorime);
		if (prijavljenKorisnik == null) {
			request.getRequestDispatcher("./LogoutServlet").forward(request, response);
			return;
		}
		if(prijavljenKorisnik.getUloga().name().equals("KORISNIK")){
			request.getRequestDispatcher("./LogoutServlet").forward(request, response);
			return;
		}
		
		List<Film> filmovi = FilmDAO.getAll();
		
		Map<String, Object> data = new LinkedHashMap<>();
		data.put("prijavljenKorisnikKorime", prijavljenKorisnikKorime);
		data.put("filmovi", filmovi);
		
		request.setAttribute("data", data);
		request.getRequestDispatcher("./SuccessServlet").forward(request, response);
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String prijavljenKorisnikKorime = (String) request.getSession().getAttribute("prijavljenKorisnik");
		
		String filmString = request.getParameter("idFilma");
		String tipString = request.getParameter("tipProjekcijeValue");
		String salaString = request.getParameter("salaValue");
		String datumVreme = request.getParameter("datumVreme");
		String cenaKarteString = request.getParameter("cenaKarteValue");
		
		int film = Integer.parseInt(filmString);
		int tip = Integer.parseInt(tipString);
		int sala = Integer.parseInt(salaString);
		int cenaKarte = Integer.parseInt(cenaKarteString);

		
		Projekcija projekcija = new Projekcija(0, film, tip, sala, datumVreme, cenaKarte, prijavljenKorisnikKorime, true);
		ProjekcijaDAO.add(projekcija);


		Map<String, Object> data = new LinkedHashMap<>();

		request.setAttribute("data", data);
		request.getRequestDispatcher("./SuccessServlet").forward(request, response);
	}

}
