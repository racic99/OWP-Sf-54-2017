package aplikacija;

import java.io.IOException;
import java.util.LinkedHashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import baza.FilmDAO;
import baza.KorisnikDAO;
import model.Film;
import model.Korisnik;

public class DodavanjeFilmaServlet extends HttpServlet {
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
		
		Map<String, Object> data = new LinkedHashMap<>();
		data.put("prijavljenKorisnikKorime", prijavljenKorisnikKorime);
		
		request.setAttribute("data", data);
		request.getRequestDispatcher("./SuccessServlet").forward(request, response);
		
	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		String naziv = request.getParameter("naziv");
		String reziser = request.getParameter("reziser");
		String glumci = request.getParameter("glumci");
		String zanrovi = request.getParameter("zanrovi");
		String trajanje = request.getParameter("trajanje");
		String distributer = request.getParameter("distributer");
		String zemljaPorekla = request.getParameter("zemljaPorekla");
		String godinaProizvodnje = request.getParameter("godinaProizvodnje");
		String opis = request.getParameter("opis");
		
		Film film = new Film(0, naziv, reziser, glumci, zanrovi, trajanje, distributer, zemljaPorekla, godinaProizvodnje, opis, true);
		FilmDAO.add(film);


		Map<String, Object> data = new LinkedHashMap<>();

		request.setAttribute("data", data);
		request.getRequestDispatcher("./SuccessServlet").forward(request, response);
	}

}
