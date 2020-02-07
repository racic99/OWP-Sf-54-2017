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
import baza.IzvestavanjeDAO;
import baza.KorisnikDAO;
import model.Film;
import model.Izvestavanje;
import model.Korisnik;

public class IzvestavanjeServlet extends HttpServlet {
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
		
		String datum1 = request.getParameter("datum1");
		String datum2 = request.getParameter("datum2");
		
		List<Izvestavanje> izvestavanje = IzvestavanjeDAO.getAll(datum1, datum2);
		List<Film> filmovi = FilmDAO.getAll();

		
		Map<String, Object> data = new LinkedHashMap<>();
		data.put("izvestavanje", izvestavanje);
		data.put("prijavljenKorisnikKorime", prijavljenKorisnikKorime);
		data.put("filmovi", filmovi);
		
		request.setAttribute("data", data);
		request.getRequestDispatcher("./SuccessServlet").forward(request, response);	}

	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		doGet(request, response);
	}

}
